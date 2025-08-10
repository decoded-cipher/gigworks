import { Metadata } from 'next';

export const runtime = "edge";

export const metadata: Metadata = {
  title: 'Page Not Found - Gigwork',
  description: 'The page you are looking for could not be found. Return to Gigwork to find verified professionals and skilled service providers.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Page Not Found - Gigwork',
    description: 'The page you are looking for could not be found.',
    type: 'website',
    url: 'https://gigwork.co.in/404',
  },
};

export default function NotFound() {
  return (
    <>
      <div style={styles.error}>
        <div>
          <style
            dangerouslySetInnerHTML={{
              __html: `body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}`,
            }}
          />
          <h1 className="next-error-h1" style={styles.h1}>
            404
          </h1>
          <div style={styles.desc}>
            <h2 style={styles.h2}>This page could not be found.</h2>
            <p style={styles.p}>
              <a href="/" style={styles.link}>Return to Gigwork Homepage</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  error: {
    fontFamily:
      'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
    height: "100vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  desc: {
    display: "inline-block",
  },

  h1: {
    display: "inline-block",
    margin: "0 20px 0 0",
    padding: "0 23px 0 0",
    fontSize: 24,
    fontWeight: 500,
    verticalAlign: "top",
    lineHeight: "49px",
  },

  h2: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "49px",
    margin: 0,
  },

  p: {
    marginTop: 20,
    fontSize: 14,
  },

  link: {
    color: '#00A651',
    textDecoration: 'none',
  },
} as const;
