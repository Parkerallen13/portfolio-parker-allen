function loadData() {
  fetch("data.json")
      .then(response => response.json())  
      .then(data => {
          console.log(data);

          // call each function
          renderContent("box-container-marketing-ktp", data["marketing-ktp"]);
          renderContent("box-container-marketing-hyperloop", data["marketing-hyperloop"]);
          renderContent("box-container-hobbies", data.hobbies);
          renderContent("box-container-webdev", data.webdev);
          renderContent("box-container-figma", data.figma);

          // Insert "json" header after the first two webdev items
          const webdevContainer = document.querySelector(".box-container-webdev");
          const afterJava = webdevContainer.children;

          if (afterJava.length > 2) {
              const header = document.createElement("h2");
            //   header.textContent = "JSON";
              webdevContainer.insertBefore(header, afterJava[2]);
          }

          if (containerClass === "box-container-webdev") {
            const title = document.createElement("h1");
            title.textContent = "HTML";
            container.insertBefore(title, container.firstChild);
        }
      })
      .catch(error => {
          console.error("Error loading data.json:", error);  // display to screen if error found
      });
}


function renderContent(containerClass, items) {
const container = document.querySelector(`.${containerClass}`);

  if (!container || !items) return;

  //assemble information
  items.forEach(item => {
      const box = document.createElement("div");
      box.classList.add("box");

      // check if json item has an image 
      if (item.images) {
        item.images.forEach(imgData => {
            const img = document.createElement("img");
            img.src = imgData.src; // src of the image
            img.alt = imgData.alt || item.description || "Portfolio image"; // alt text of the image
            img.classList.add("collage-img");
            box.appendChild(img);
        });
    }

      // check if json item has a description
      if (item.description) {
          const description = document.createElement("p");
          description.textContent = item.description;
          box.appendChild(description);
      }

      // check if json item has links
      if (item.links) {
          item.links.forEach(linkData => {
              const link = document.createElement("a");
              link.href = linkData.url;
              link.textContent = linkData.text;
              link.target = "_blank";
              link.classList.add("project-link");
              box.appendChild(link);
          });
      }

      container.appendChild(box);
  });
}

// load DOM and call loadData function
document.addEventListener("DOMContentLoaded", loadData);
