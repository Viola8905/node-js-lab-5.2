const Participants = require ("./model.js");

const participantController = {
    getAll:(req,res) => {
        res.send(Participants)
    },


    // отримання вибірки з колекції згідно з вказаними параметрами (параметри передаються через рядок стану)

    qetQuery:(req,res) => {
        let queriedParticipants = Participants;

        if(req.query.age)
            queriedParticipants = queriedParticipants.filter((participant) => parseInt(participant.age) == req.query.age);

        if(req.query.com1)
            queriedParticipants =  queriedParticipants.filter((participant) =>  parseInt(participant.com1) == req.query.com1);

        res.send(queriedParticipants);
        
        

    },
     // отримання інформації щодо одного об’єкту (за Кодом),
     getById: (req,res) => {
        let participant = Participants.find((participant) => participant.id == parseInt(req.params.id));

        if(participant != null) res.status(200).send(participant);
        
        else res.status(404).send("Not Found");
    },


     //видалення інформації про вказаний об’єкт.
     delete:(req, res) => {
        let index = Participants.findIndex((participant) => participant.id === parseInt(req.params.id));
        if (index >= 0) {
            let deletedParticipant = Participants[index];
            Participants.splice(index, 1);
            res.send(deletedParticipant );
        } else res.status(404).send("Not Found");
    },

    //додавання одного об’єкту,
    post: (req, res) => {
        let newParticipant = {
            id: Number(Date.now()),
            ...req.body,
        };
        Abonents.push(newParticipant);
        res.send(newParticipant);
    },


    // редагування інформації  про вказаний об’єкт.
    patch: (req, res) => {
        let index = Participants.findIndex((participant) => participant.id === parseInt(req.params.id));
        if (index >= 0) {
            let updatedParticipant = Participants[index];
            for (let key in updatedParticipant)
                if (req.body[key]) updatedParticipant[key] = req.body[key];
            res.send(updatedParticipant);
        } else res.status(404).send("Not Found");
    },


    //Запит учасників з країни Х, вік яких не менший за Y.

    getParticipant: (req,res) =>{
        let participants = Participants.find((participant) => participant.country ==  "Poland"  &&  parseInt(participant.age) >= 18);
        if (participants !== null) res.status(200).send(participants);
        else res.status(404).send("Not Found");

    },

     //додавання колекції об’єктів,

     addCollection : (req,res) => {
        for(let item of req.body){
            Participants.push(item);
          }
         
          res.send(Participants);

    }, 


};

module.exports = participantController;
