var express = require('express');
var app = express();
var amqp = require('amqplib/callback_api');

const kudosRoute = require('./routes/db_mongo');
const mysqlRoute = require('./routes/db_mysql');

const port = 3005;





amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((err, ch) => {
        var queue = 'FirstQueue2';
        

        ch.assertQueue(queue, {durable: false});
        console.log(`Waiting for message in ${queue}`);

        ch.consume(queue, (message) => {
            console.log(`Message ** ${message.content}`);
            let data = JSON.parse(message.content);
            // if(data.msg=='UPDATE_KUDOS')
            // {
            //     console.log(`Received -> Hello ${data.user}`);
            // }
            if(data.msg=='DELETE_KUDOS')
            {
                console.log(`Received -> Hello ${data.msg}`);
                kudosRoute.deleteAllKudos(data.user)
            }
            if(data.msg=='UPDATE_USER')
            {
                console.log(`Received -> BYE ${data.msg}`);
                
                var total = kudosRoute.countKudos(data.user);
                //console.log(total);  
              
                //console.log(total);    
                //mysqlRoute.UpdateUser(3,Number(total));

            }
        }, {noAck: true});

        
    });

    
});

app.listen(port, () => console.log(`App listening on port ${port}!`));