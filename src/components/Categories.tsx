import React from "react";
import "../styles/categories.css";

const Categories: React.FC = () => {
  const categories = [
    "Science Fiction",
    "Fantasy",
    "Romance",
    "Mystery",
    "Biography",
    "History",
    "Technology",
    "Arts",
    "Literature",
    "Philosophy",
    "Health",
    "Religion",
    "Law",
    "Cooking",
  ];

  return (
    <div className="categories-section">
      {categories.map((category, index) => (
        <span key={index}>{category}</span>
      ))}
    </div>
  );
};

export default Categories;
