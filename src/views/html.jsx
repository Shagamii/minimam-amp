import fs from "fs";

export function html(props) {
  const { body, scripts, css } = props;
  return `
    <!doctype html>
    <html amp lang="en">
    <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMPs</title>
    <link rel="canonical" href="https://amp.dev/documentation/guides-and-tutorials/start/create/basic_markup">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    ${scripts.map(
      scriptEl =>
        `<script ${Object.entries(scriptEl).reduce(
          (attributes, [key, value]) =>
            attributes +
            (typeof value === "boolean" ? key : `${key}="${value}"`) +
            " ",
          " "
        )}></script>
        `
    )}
    ${css.reduce((acc, cssPath) => {
      const styleSheetStr = fs.readFileSync(
        `${__dirname}/../assets/css/${cssPath}`,
        "utf-8"
      );
      return `${acc}<style amp-custom>${styleSheetStr}</style>`;
    }, "")}
    </head>
    <body>
    ${body}
    </body>
    </html>
`.trim();
}
