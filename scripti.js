$(document).ready(function () {
  let notes = [];

  $("body").css({
    "font-family": "Arial",
    "background-color": "#f2f2f2",
    margin: "0",
  });

  $("#container").css({
    width: "700px",
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
    let title = $("#title").val();
    let content = $("#content").val();

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

                    <h3>${note.title}</h3>

                    <p>${note.content}</p>

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

  $("#search").keyup(function () {
    let value = $(this).val().toLowerCase();

    $(".note").each(function () {
      let text = $(this).text().toLowerCase();

      if (text.includes(value)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});
