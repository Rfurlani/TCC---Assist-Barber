class Subject{

    constructor(){
        this.observers = [];

        if (this.constructor === Subject){
            throw new TypeError('Classe Abstrata "Subject" não pode ser instanciada!');
        }
    }

    subscribe(observer){
        this.observers.push(observer);
    }

    unsubscribe(observer){
        let index = this.observers.indexOf(observer);
        if(index > -1){
            this.observers.slice(index, 1);
        }
    }

    notifyObservers(){
        for( let o of this.observers){
            console.log(o.name, 'Notificado!');
        }
    }

}

export default Subject;