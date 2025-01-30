export function stringToElement(html_string) {
  const temp_container = document.createElement("div");
  temp_container.innerHTML = html_string;

  const html_element = temp_container.firstElementChild;

  return html_element;
}

export function isScrolledToBottom() {
  return (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 1
  );
}
