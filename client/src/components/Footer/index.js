import React from 'react';

const Footer = () => {
  const date = new Date().getFullYear()

  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container">&copy;{date} by Edwin Escobar</div>
    </footer>
  );
};

export default Footer;
