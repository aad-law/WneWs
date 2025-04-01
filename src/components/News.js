import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Newsitems from './Newsitems';
import Spinner from './Spinner';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 10,
    apiKey: process.env.REACT_APP_NEWS_API_KEY };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
    apiKey: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      error: null,
      nextPage: null
    };
    this.updateInterval = null;
  }

  async fetchNews(page = 1) {
    const { category, apiKey } = this.props;
    
    // Use different base URLs for different categories
    let url;
    switch(category.toLowerCase()) {
      case 'sports':
        url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=sports`;
        break;
      case 'science':
        url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=science`;
        break;
      case 'health':
        url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=health`;
        break;
      case 'technology':
        url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=technology`;
        break;
      case 'business':
        url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=business`;
        break;
      case 'entertainment':
        url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=entertainment`;
        break;
      default:
        url = `https://newsdata.io/api/1/news?apikey=${apiKey}`;
    }
    
    // Add nextPage token if available and not on page 1
    const finalUrl = (page > 1 && this.state.nextPage) 
      ? `${url}&page=${this.state.nextPage}`
      : url;
    
    console.log(`Fetching news for category: ${category}`);
    console.log(`API URL: ${finalUrl}`);
    
    this.setState({ loading: true, error: null });
    
    try {
      let response = await fetch(finalUrl);
      
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
      
      let parsedData = await response.json();
      console.log('API response:', parsedData);
      
      if (parsedData.status === 'error') {
        throw new Error(parsedData.message || 'API returned an error');
      }
      
      const articles = Array.isArray(parsedData.results) ? parsedData.results : [];
      
      this.setState({
        articles: articles,
        loading: false,
        totalResults: parsedData.totalResults || 0,
        page: page,
        nextPage: parsedData.nextPage || null
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      
      // Special handling for rate limit errors
      if (error.message.includes('429')) {
        this.setState({ 
          loading: false,
          error: "API rate limit reached. Please try again in a few minutes."
        });
      } else {
        this.setState({ 
          loading: false,
          error: `Failed to load news: ${error.message}`
        });
      }
    }
  }

  async componentDidMount() {
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - W News`;
    await this.fetchNews();
    // Reduce refresh frequency to avoid rate limits
    this.updateInterval = setInterval(() => this.fetchNews(this.state.page), 15 * 60 * 1000); // 15 minutes
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      console.log(`Category changed from ${prevProps.category} to ${this.props.category}`);
      this.setState({ page: 1, nextPage: null }, () => {
        this.fetchNews(1);
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - W News`;
      });
    }
  }

  componentWillUnmount() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handlePrevClick = async () => {
    alert("Previous page navigation is not supported by this API");
  };

  handleNextClick = async () => {
    if (this.state.nextPage) {
      await this.fetchNews(this.state.page + 1);
    }
  };

  render() {
    return (
      <div className="container my-3" style={{ marginTop: '90px' }}>
        <h2 className="text-center mb-4">
          W News - Top 
          {/* {this.capitalizeFirstLetter(this.props.category)} Headlines */}
        </h2>
        {this.state.loading && <Spinner />}
        
        {this.state.error && 
          <div className="alert alert-danger text-center">{this.state.error}</div>
        }
        
        <div className="row">
          {!this.state.loading && !this.state.error && this.state.articles.length === 0 && 
            <div className="col-12 text-center">
              <h3>No articles found for this category</h3>
              <p>Try selecting a different category or check your API key.</p>
            </div>
          }
          
          {!this.state.loading && !this.state.error &&
            this.state.articles.map((element, index) => (
              <div className="col-md-4 mb-4" key={element.article_id || element.link || index}>
                <Newsitems
                  title={element.title || 'No title available'}
                  description={element.description || 'No description available'}
                  imageUrl={element.image_url}
                  newsUrl={element.link}
                  source={element.source_id}
                  date={element.pubDate}
                />
              </div>
            ))}
        </div>
        
        <div className="container d-flex justify-content-between my-4">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={!this.state.nextPage}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;