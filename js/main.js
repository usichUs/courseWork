class File {
    constructor(name, size, date) {
      this.name = name;
      this.size = size;
      this.date = date;
    }
  }
  
  class Folder {
    constructor(name, files, folders) {
      this.name = name;
      this.files = files;
      this.folders = folders;
    }
  }

  const folder = new Folder("Каталог 1", [
    new File("Файл 1.1", 1024, new Date()),
    new File("Файл 1.2", 2048, new Date())
  ], []);