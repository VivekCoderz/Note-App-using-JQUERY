$(document).ready(function () {
  let notes = [];

  // Escape user text before putting it into HTML (stops <script>/<img onerror> injection)
  function escapeHtml(text) {
    return $("<div>").text(text).html();
  }

  $("body").css({
    "font-family": "Arial",
    "background-color": "#f2f2f2",
    margin: "0",
  });

  $("#container").css({
    width: "700px",
    "max-width": "calc(100% - 32px)",
    margin: "40px auto",
  });

  $("h1").css({
    "text-align": "center",
  });

  $("#form").css({
    "background-color": "white",
    padding: "20px",
    "border-radius": "8px",
  });

  $("input, textarea").css({
    width: "100%",
    padding: "10px",
    "margin-bottom": "12px",
    "box-sizing": "border-box",
    border: "1px solid #ccc",
    "border-radius": "5px",
    "font-size": "16px",
  });

  $("#content").css({
    height: "120px",
    resize: "none",
  });

  $("button").css({
    padding: "10px 15px",
    border: "none",
    "border-radius": "5px",
    cursor: "pointer",
  });

  $("#add").css({
    "background-color": "black",
    color: "white",
  });

  $("#search").css({
    "margin-top": "20px",
    "background-color": "white",
  });

  $("#add").click(function () {
    let title = $("#title").val().trim();
    let content = $("#content").val().trim();

    if (title == "" || content == "") {
      alert("Please enter title and content");

      return;
    }

    let note = {
      title: title,
      content: content,
    };

    notes.push(note);

    showNotes();

    $("#title").val("");
    $("#content").val("");
  });

  function showNotes() {
    $("#notes").html("");

    $.each(notes, function (index, note) {
      $("#notes").append(`

                <div class="note">

                    <h3>${escapeHtml(note.title)}</h3>

                    <p>${escapeHtml(note.content)}</p>

                    <button class="edit"
                        data-index="${index}">
                        Edit
                    </button>

                    <button class="delete"
                        data-index="${index}">
                        Delete
                    </button>

                </div>

            `);
    });

    $(".note").css({
      "background-color": "white",
      padding: "20px",
      "margin-top": "15px",
      "border-radius": "8px",
    });

    $(".note h3").css({
      "margin-bottom": "10px",
    });

    $(".note p").css({
      color: "#555",
      "margin-bottom": "15px",
    });

    $(".edit").css({
      "background-color": "orange",
    });

    $(".delete").css({
      "background-color": "red",
      color: "white",
      "margin-left": "5px",
    });

    // Keep the current search applied after the list is redrawn
    filterNotes();
  }

  function filterNotes() {
    let value = $("#search").val().toLowerCase();

    $(".note").each(function () {
      // Only search the title and content, not the Edit/Delete button labels
      let text = $(this).find("h3, p").text().toLowerCase();

      if (text.includes(value)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }

  $("#notes").on("click", ".delete", function () {
    let index = $(this).data("index");

    notes.splice(index, 1);

    showNotes();
  });

  $("#notes").on("click", ".edit", function () {
    let index = $(this).data("index");

    $("#title").val(notes[index].title);

    $("#content").val(notes[index].content);

    notes.splice(index, 1);

    showNotes();
  });

  $("#search").on("input", filterNotes);
});
