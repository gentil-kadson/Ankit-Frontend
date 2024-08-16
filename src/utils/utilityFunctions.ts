export async function downloadFile(url: string) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";

  link.click();
  link.remove();
}
