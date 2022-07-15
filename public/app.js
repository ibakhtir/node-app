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
    const newTitle = prompt("Введите новое название");

    if (newTitle) {
      const putMethod = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ data: newTitle }),
      };

      edit(id, putMethod).then(() => {
        const actionBlock = document.querySelector(".action-block");
        const el = document.querySelector(`[data-id="${id}"]`);
        el.closest("li").innerHTML = `${newTitle} ${actionBlock.outerHTML}`;
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
