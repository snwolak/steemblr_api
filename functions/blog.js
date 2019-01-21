const layout = (props )=> {
  return {
    author: props.displayName,
    about: "",
    avatar_shape: "circle",
    background_color: { r: 225, g: 226, b: 225, a: 1 },
    cover_image: "",
    layout: "default",
    name: props.displayName,
    show_avatar: true,
    show_description: true,
    show_header_image: true,
    show_title: true,
    title_color: {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    },
    title_font: {
      family: "Roboto",
      category: "sans-serif",
      url:
        "https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmSU5fBBc4.woff2"
    }
  }
  
};
module.exports = {
  layout
}