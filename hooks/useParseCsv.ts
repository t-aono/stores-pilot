export function useCsvParser() {
  const parseCsvFile = async (
    files: FileList | null = null,
    charCode = "utf-8"
  ) => {
    if (!files || files?.length === 0) return null;
    const reader = new FileReader();
    reader.readAsText(files[0], charCode);
    await new Promise<void>((resolve) => (reader.onload = () => resolve()));
    if (typeof reader.result !== "string") return null;
    const content = reader.result;
    let lines = content.split(/\r\n|\n/);
    return lines.map((line) => {
      let cells = line.split(",");
      if (cells.length !== 1) {
        return cells.map((cell) => cell.replace(/"/g, ""));
      } else {
        return [];
      }
    });
  };

  return { parseCsvFile };
}
