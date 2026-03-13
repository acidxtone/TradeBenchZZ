import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Shared nav links for the whole site: Home, Trades, Study Guides, Job Board.
 * Use on every page so users can reach these from anywhere.
 * @param {string} linkClassName - Tailwind classes for each link (e.g. "text-sm text-slate-600 hover:text-blue-600")
 * @param {string} wrapperClassName - Tailwind classes for the wrapper (e.g. "flex items-center gap-3")
 */
export function SiteNavLinks({ linkClassName = 'text-sm text-slate-600 hover:text-blue-600 transition-colors', wrapperClassName = 'flex items-center gap-3' }) {
  return (
    <div className={wrapperClassName}>
      <Link to="/" className={linkClassName}>Home</Link>
      <Link to="/trades" className={linkClassName}>Trades</Link>
      <Link to="/trades" className={linkClassName}>Study Guides</Link>
      <a href="/jobs.html" className={linkClassName}>Job Board</a>
    </div>
  );
}
