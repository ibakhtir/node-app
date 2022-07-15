document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  // edit

  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const el = document.querySelector(`p[data-id="${id}"]`);
    const newTitle = prompt(
      "Введите новое название",
      `${el.textContent}`.trim()
    );

    if (newTitle) {
      const putMethod = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ data: newTitle }),
      };

      edit(id, putMethod).then(() => {
        el.textContent = newTitle;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, method) {
  await fetch(`/${id}`, method);
}
