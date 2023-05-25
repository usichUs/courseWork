let maxID = 4;

const tree = document.querySelector(`#file-tree`);

const contextMenu = document.querySelector(`.fold-context-menu`);

const FILESYSTEM = [
    {
      id: 0,
      type: 0,
      parentId: null,
      name: 'Folder 1',
    },
    {
      id: 1,
      type: 0,
      parentId: null,
      name: 'Folder 2',
    },
    {
      id: 2,
      type: 0,
      parentId: 1,
      name: 'Folder 3',
    },
    {
      id: 3,
      type: 1,
      parentId: 1,
      name: 'File 1',
    },
    {
      id: 4,
      type: 1,
      parentId: 1,
      name: 'File 2',
    },
    {
      id: 5,
      type: 1,
      parentId: 2,
      name: 'File 3',
    },
    {
      id: 6,
      type: 0,
      parentId: 2,
      name: 'Folder 4',
    },
    {
      id: 7,
      type: 1,
      parentId: 6,
      name: 'File 4',
    },
    {
      id: 8,
      type: 0,
      parentId: 0,
      name: 'Folder 5',
    },
    {
      id: 9,
      type: 1,
      parentId: 8,
      name: 'File 5',
    },
    {
      id: 10,
      type: 1,
      parentId: 8,
      name: 'File 6',
    },
    {
      id: 11,
      type: 0,
      parentId: 8,
      name: 'Folder 6',
    },   
    {
      id: 12,
      type: 0,
      parentId: 11,
      name: 'Folder 7',
    },  
    {
      id: 13,
      type: 0,
      parentId: 12,
      name: 'Folder 8',
    },  
    {
      id: 14,
      type: 1,
      parentId: 13,
      name: 'File 7',
    },  
  ]

class FileSystem {
    data = null
    maxId = 0
    init(data) {
      this.data = data
      this.calcMaxId()
    }
  
    calcMaxId() {
      let maxId = 0;
      for (let i = 0; i < this.data.length; i++) {
        maxId = Math.max(maxId, this.data[i].id);
      }
      this.maxId = maxId;
    }
  
    createFolder(parentId, name) {
      this.maxId++;
      this.data.push({
        id: this.maxId,
        type: 0,
        parentId,
        name,
    })
    }
    
    createFile(parentId, name) {
      this.maxId++;
      this.data.push({
        id: this.maxId,
        type: 1,
        parentId,
        name,
      })
    }
    
    deleteFile(fileId) {
      for (let i = 0; i < this.data.length; i++) {
        if(this.data[i].type == 1 && this.data[i].id == fileId) {
            this.data.splice(i, 1);
            break;
        }
      }
    }

    deleteFolder(folderId) {
      let mID;
      let dI;
      for (let i = 0; i < this.data.length; i++) {
          if(this.data[i].type === 0 && this.data[i].id === folderId) {
              mID = this.data[i].id;
              dI = i;
          }
      }
      for (let j = 0; j < this.data.length; j++) {
          if(this.data[j].type === 1 && this.data[j].parentId === mID){
              this.data.splice(j, 1);
              j--;
          }
      }
      FILESYSTEM.splice(dI, 1);
      return;
  }
  }
  
  class FileSystemHTML extends FileSystem{
    outerHtml = null
    contextMenuFileItems = [{
      name: `Удалить файл`,
      onclick: (fileId)=> {
        this.deleteFile(fileId);
      }
    },
  ]
    contextMenuFolderItems = [{
      name: `Удалить папку`,
      onclick: (folderId)=> {
        this.deleteFolder(folderId);
      },
    },
    {
      name: `Добавить папку`,
      onclick: (parentId)=> {
        this.createFolder(parentId, `Новая папка`);
      },
    },
    {
      name: `Добавить файл`,
      onclick: (parentId)=> {
        this.createFile(parentId, `Новый файл`);
      },
    },
  ]
    drow(htmlElement) {
        this.outerHtml = htmlElement
        this.render();
      }
    
      render() {
        tree.innerHTML = ``;
        const dataHTML = this.data.reduce((sum, cur) => {
          sum[cur.id] = {
            ...cur,
            html: cur.type === 0 ? this.createHTMLFolder(cur.id, cur.name) : this.createHTMLFile(cur.id, cur.name), 
          }
          return sum;
        }, {})
        for(let elem of Object.keys(dataHTML)) {
          if (dataHTML[elem].parentId === null) {
            this.outerHtml.appendChild(dataHTML[elem].html);
          } else {
            dataHTML[dataHTML[elem].parentId].html.querySelector(`ul`).appendChild(dataHTML[elem].html);
          }
        }
      }
      
      createHTMLFolder(id, name) {
        let folder = document.createElement(`li`);
        folder.innerHTML = `<span class="folder">${name}</span> <ul></ul> `;
        const folderTitle = folder.querySelector(`span`);
        folderTitle.onclick = () => { 
          folderTitle.classList.toggle(`hidden`);
        }
        folderTitle.oncontextmenu = (event) => { 
          event.preventDefault();
          this.openPopUp(event.clientX, event.clientY, id, 0);
        }
        return folder;
      }

      createHTMLFile(id, name) {
        let file = document.createElement(`li`);
        file.innerHTML = `<span class="file">${name}</span>`;
        const fileTitle = file.querySelector(`span`);
        fileTitle.oncontextmenu = (event) => {
          event.preventDefault();
          this.openPopUp(event.clientX, event.clientY, id, 1);
        }
        return file;
      }

      createFolder(parentId, name) {
        super.createFolder(parentId, name)
        this.render()
      }
      
      createFile(parentId, name) {
        super.createFile(parentId, name)
        this.render()
      }
      
      deleteFile(fileId) {
        super.deleteFile(fileId)
        this.render()
      }
      
      deleteFolder(folderId) {
        super.deleteFolder(folderId)
        this.render()
      }

      openPopUp(coorX, coorY, id, type) {
        contextMenu.innerHTML = ``;
        contextMenu.style.top = coorY + `px`;
        contextMenu.style.left = coorX + `px`;
        contextMenu.style.display = `block`;
        document.addEventListener(`click`, this.closePopUp);
        const contextItemsHTML = this.getContextItemsHTML(id, type);
        for(let item of contextItemsHTML) {
          contextMenu.appendChild(item);
        } 
      }

      closePopUp() {
        contextMenu.style.display = `none`;
        document.removeEventListener(`click`, this.closePopUp);
      }

      getContextItemsHTML(id, type) {
        const items = type === 0 ? this.contextMenuFolderItems : this.contextMenuFileItems
         return items.map((item)=> {
          let el = document.createElement(`div`);
          el.textContent = item.name;
          el.onclick = ()=> {
            item.onclick(id);
          }
          return el
         })
      }

    }

    const filesystem = new FileSystemHTML();
    filesystem.init(FILESYSTEM);
    filesystem.drow(tree);

  

