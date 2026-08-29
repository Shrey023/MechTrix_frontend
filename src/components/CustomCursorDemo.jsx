import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const bigBallRef = useRef(null);
  const smallBallRef = useRef(null);

  useEffect(() => {
    const previousBodyCursor = document.body.style.cursor;
    const previousHtmlCursor = document.documentElement.style.cursor;

    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';

    const handleMouseMove = (e) => {
      if (!bigBallRef.current || !smallBallRef.current) return;

      gsap.to(bigBallRef.current, {
        duration: 0.4,
        x: e.clientX - 15,
        y: e.clientY - 15,
      });

      gsap.to(smallBallRef.current, {
        duration: 0.1,
        x: e.clientX - 5,
        y: e.clientY - 7,
      });
    };

    const handleMouseOver = (e) => {
      if (!bigBallRef.current) return;
      if (e.target.closest('[data-hoverable]')) {
        gsap.to(bigBallRef.current, {
          duration: 0.3,
          scale: 4,
        });
      }
    };

    const handleMouseOut = (e) => {
      if (!bigBallRef.current) return;

      const fromHoverable = e.target.closest('[data-hoverable]');
      const toHoverable = e.relatedTarget && e.relatedTarget.closest
        ? e.relatedTarget.closest('[data-hoverable]')
        : null;

      if (fromHoverable && !toHoverable) {
        gsap.to(bigBallRef.current, {
          duration: 0.3,
          scale: 1,
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.body.style.cursor = previousBodyCursor;
      document.documentElement.style.cursor = previousHtmlCursor;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const sharedCursorStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 999999,
    mixBlendMode: 'difference',
  };

  return (
    <>
      <div ref={bigBallRef} style={sharedCursorStyle} aria-hidden="true">
        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="15" fill="#f7f8fa" />
        </svg>
      </div>

      <div ref={smallBallRef} style={sharedCursorStyle} aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="5" r="5" fill="#f7f8fa" />
        </svg>
      </div>
    </>
  );
}

export default function CustomCursorDemo() {
  return (
    <>
      <style>{`
        body {
          margin: 0;
          background: #010101;
          cursor: none;
          display: flex;
          height: 100vh;
          font-family: Arial, sans-serif;
        }

        #root {
          width: 100%;
        }

        .demo-layout {
          display: flex;
          width: 100%;
          height: 100vh;
        }

        .panel {
          width: 50%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4rem;
        }

        .left {
          background: #010101;
          color: #fff;
        }

        .right {
          background: #fff;
          color: #000;
        }

        h1 {
          margin: 0 0 1rem;
          font-size: clamp(2rem, 5vw, 4rem);
          line-height: 1.1;
        }

        p {
          margin: 0 0 1.5rem;
          max-width: 40ch;
          line-height: 1.6;
          font-size: 1rem;
        }

        a {
          display: inline-block;
          width: fit-content;
          text-decoration: none;
          border-bottom: 2px solid currentColor;
          padding-bottom: 2px;
          color: inherit;
          font-weight: 600;
        }

      `}</style>

      <CustomCursor />

      <main className="demo-layout">
        <section className="panel left">
          <h1>Dark Section</h1>
          <p>
            Move the cursor around and hover the link to see the big ball scale animation.
          </p>
          <a href="#" data-hoverable>
            Explore Services
          </a>
        </section>

        <section className="panel right">
          <h1>Light Section</h1>
          <p>
            The cursor circles use difference blend mode, so they invert against white and black backgrounds.
          </p>
          <a href="#" data-hoverable>
            Contact Support
          </a>
        </section>
      </main>
    </>
  );
}
