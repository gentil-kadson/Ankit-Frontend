export async function downloadFile(url: string) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";

  link.click();
  link.remove();
}

export function getISODate(date: Date) {
  return date.toISOString().split("T")[0];
}
