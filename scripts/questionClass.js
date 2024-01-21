

export class Question{

    constructor(title , answers , correct  ){
        this.title = title ;
        this.answers = answers ;
        this.correct = correct ;
        this.checkedOne = "" ;
    }
}

export class Test{
    constructor(id , category , Questions){
        this.id = id ;
        this.category = category ;
        this.Questions = Questions ;
    }
}

export class Answer{
    constructor(Name , value , checked){
        this.Name = Name ;
        this.value = value ;
        this.checked = checked ;
    }
}