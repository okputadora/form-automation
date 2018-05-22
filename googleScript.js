// this is the function that lives on google's servers -- it does not actually run here
// this is just for reference
// we execute this code from our form controller after 
// a teacher fills out a form specifiying their class and question etc.


function createForm(teacherName, students, assignmentName, question) {
    // These should be parameters of createForm once we enable scripts in our project
    var form = FormApp.create(assignmentName);
    var item = form.addListItem();
    item.setTitle('Select your name from the dropdown menu');
    var studentNames = students.map(function(student) {
      return item.createChoice(student)
    })
    item.setChoices(studentNames);
    form.addTextItem()
      .setTitle(question);
    form.addParagraphTextItem()
      .setTitle('explain how you arrived at your answer');
    Logger.log('Published URL: ' + form.getPublishedUrl());
    Logger.log('Editor URL: ' + form.getEditUrl());
    return [form.getPublishedUrl(), form.getEditUrl()];
  }
  