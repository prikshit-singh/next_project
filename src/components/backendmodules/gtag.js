export const GA_MEASUREMENT_ID = 'G-RBQ5TWCSZ7';
export const pageview = () => {
  window.gtag("config", 'G-RBQ5TWCSZ7', {
    page_path: 'www.gitgurus.com',
  });
};
 
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};