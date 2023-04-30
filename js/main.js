// Папки
const folders = document.querySelectorAll("#file-tree .folder");
// Файлы
const files = document.querySelectorAll("#file-tree .file");
// Дерево
const fileTree = document.querySelector("#file-tree");


// Открыть/Закрыть папку
folders.forEach((folder) => {
  folder.addEventListener("click", () => {
    const childFiles = folder.nextElementSibling.querySelectorAll(".file");
    childFiles.forEach((file) => {
      file.classList.toggle("hidden");
    });
    folder.classList.toggle("open");
  });
});

// Контекстное меню 
fileTree.addEventListener("contextmenu", (event)=> {
  event.preventDefault();

  const target = event.target;

  if(target.classList.contains("folder")) {

  };
});

// Обработчик клика на файл - показывает какой файл открыт
files.forEach((file) => {
  file.addEventListener("click", () => {
    console.log(`Открыт файл: ${file.textContent}`);
  });
});
