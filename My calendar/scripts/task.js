class Task{
    /*
    *Initialize elements
    */
    constructor (title, important, dueDate, description, alertText, location ){
        this.title=title;
        this.important=important;
        this.dueDate=dueDate;
        this.description=description;
        this.alertText=alertText;
        this.location=location;

        this.user="Roberto";
        this.createdOn=new Date();

    }


}


//Modeling

/**
 * 
 * create the UI
 * catch the click event on the save button
 * call a save fn
 * get the values from the input fields
 * create an object
 * console log the object
 * 
 */