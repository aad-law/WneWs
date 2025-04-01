// NewsItems.js - Enhanced with smaller card size
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Newsitems extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    newsUrl: PropTypes.string,
    source: PropTypes.string,
    date: PropTypes.string
  };

  render() {
    let { title, description, imageUrl, newsUrl, source, date } = this.props;

    // Limit title to first 8 words (reduced from 10)
    const limitedTitle = title
      ? title.split(" ").slice(0, 8).join(" ") + (title.split(" ").length > 8 ? "..." : "")
      : "";

    // Limit description to 100 characters (reduced from 150)
    const limitedDescription = description
      ? description.length > 100
        ? description.slice(0, description.lastIndexOf(" ", 100)) + "..."
        : description
      : "";

    // Default image if no imageUrl provided
    const defaultImage = "https://st.depositphotos.com/1011646/1255/i/950/depositphotos_12553000-stock-photo-breaking-news-screen.jpg";
    const finalImageUrl = imageUrl && imageUrl.trim() !== "" ? imageUrl : defaultImage;

    // Format date
    const formattedDate = date ? new Date(date).toLocaleDateString() : '';

    return (
      <div className="card h-100 news-card">
        <div className="position-absolute top-0 end-0 m-2">
          <span className="badge rounded-pill bg-danger" style={{ fontSize: '0.7rem' }}>{source || 'Unknown'}</span>
        </div>
        <img
          src={finalImageUrl}
          className="card-img-top"
          alt="news-thumbnail"
          style={{ height: "200px" , objectFit: "cover" }} // Reduced from 200px
          onError={(e) => {e.target.src = defaultImage}}
        />
        <div className="card-body p-2"> {/* Reduced padding */}
          <h5 className="card-title" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{limitedTitle}</h5>
          <p className="card-text" style={{ fontSize: '0.85rem' }}>{limitedDescription}</p>
        </div>
        <div className="card-footer bg-transparent border-top-0 p-2"> {/* Reduced padding */}
          <p className="card-text mb-1">
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>Published on {formattedDate || 'Unknown date'}</small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }} // Smaller button
          >
            Read more...
          </a>
        </div>
      </div>
    );
  }
}

export default Newsitems;