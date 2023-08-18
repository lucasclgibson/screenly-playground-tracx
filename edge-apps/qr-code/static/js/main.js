/* global screenly, QRCode */

/**
 * @param {string} url
 * @param {object} options
 * @param {boolean} enable_ga
 * @param {function} callback
 * @return {void}
 * @description Generate QR code
 * @example
 * generateQrCode(
 *   'https://react.gg/',
 *   options,
 *   enable_ga = false,
 *   callback = (svgElement) => {
 *     document.body.appendChild(svgElement);
 *   },
 *  );
 */
function generateQrCode(url, options, enable_ga, callback) {
  const handleUrl = (url) => {
    if (!enable_ga) return url;
    const { location, hostname } = screenly.metadata;
    const queryParams = {
      utm_source: 'screenly',
      utm_medium: 'digital-signage',
      utm_location: encodeURIComponent(location),
      utm_placement: encodeURIComponent(hostname),
    };

    const queryString = Object.entries(queryParams).map(([key, value]) => {
      return `${key}=${value}`;
    }).join('&');

    return `${url}?${queryString}`;
  };

  QRCode.toString(url, options, (err, result) => {
    if (err) throw err;

    const parser = new DOMParser();
    const svg = parser.parseFromString(result, 'image/svg+xml');

    callback(svg.documentElement);
  });
}

window.onload = function() {
  generateQrCode(
    'https://www.screenly.io/blog/',
    options = {
      type: 'image/svg',
      color: {
        light: '#ffffff',
      },
      margin: 2,
    },
    enable_ga = true,
    callback = (svgElement) => {
      svgElement.classList.add('qr-code');
      const container = document.querySelector('.container');
      container.appendChild(svgElement);
    },
  );
};
