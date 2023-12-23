const express = require('express');
const fetch = require('node-fetch');
const s7 = require('nodes7');

const app = express();
const port = 3000;



const variables = {
     Işık01:'DB1,X0.0',
     Priz01:'DB1,X0.1',
     Perde01:'DB1,X2.0',
     Işık02:'DB1,X3.0',
     Priz02:'DB1,X4.0',
     Perde02:'DB1,X5.0',
     Işık03:'DB1,X6.0',
     Priz03:'DB1,X7.0',
     Perde03:'DB1,X8.0',
     Işık04:'DB1,X9.0',
     Priz04 :'DB1,X10.0',
     Perde04:'DB1,X11.0',
     Işık05:'DB1,X12.0',
     Priz05:'DB1,X13.0',
     Perde05:'DB1,X14.0',
     Işık06:'DB1,X15.0',
     Priz06:'DB1,X16.0',
     Perde06:'DB1,X17.0',
     Işık07:'DB1,X18.0',
     Priz07:'DB1,X19.0',
     Perde07:'DB1,X20.0',
     Işık08:'DB1,X21.0',
     Priz08:'DB1,X22.0',
     Perde08:'DB1,X23.0',
     Işık09:'DB1,X24.0',
     Priz09:'DB1,X25.0',
     Perde09:'DB1,X26.0',
     Işık010:'DB1,X27.0',
     Priz010:'DB1,X28.0',
     Perde010:'DB1,X29.0'
     
   };
 












// Set up the connection to your PLC
const connectionParams = {
  host: '140.80.16.209', // Replace with the actual IP address of your PLC
  port: 102, // S7 protocol port
  rack: 0,
  slot: 2 // Slot number of your PLC
};

const plc = new s7();
plc.addItems( 
   'Işık01',
   'Priz01',
   'Perde01',
   'Işık02',
   'Priz02',
   'Perde02',
   'Işık03',
   'Priz03',
   'Perde03',
   'Işık04',
   'Priz04' ,
   'Perde04',
   'Işık05',
   'Priz05',
   'Perde05',
   'Işık06',
   'Priz06',
   'Perde06',
   'Işık07',
   'Priz07',
   'Perde07',
   'Işık08',
   'Priz08',
   'Perde08',
   'Işık09',
   'Priz09',
   'Perde09',
   'Işık010',
   'Priz010',
   'Perde010'
  
  
  );


///////////////////////////////////////////////

function yaz(test,bit) {
  
plc.setTranslationCB(function(tag) { return variables[tag]; });   // This sets the "translation" to allow us to work with object names
  
  plc.addItems(test);
  
  plc.writeItems(test, bit, valuesWritten); // This writes a single boolean item (one bit) to true
  
}

function oku(err,test1) {
  
  plc.setTranslationCB(function(tag) { return variables[tag]; });   // This sets the "translation" to allow us to work with object names
  plc.addItems(test1);
  plc.readAllItems(valuesReady);
}
function valuesReady(anythingBad, values) {
  if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
  console.log(values);
  
  
}

function valuesWritten(anythingBad) {
  if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
  console.log("Done writing.");
  
  
}

////////////////******************************************* */


// Define the route handlers
app.post('/:device/:action', (req, res) => {
    const { device, action } = req.params;
    //const command = `${device}/${action}`;
    console.log(`zafer ${device}/${action}`);
         
  
    if (action === 'on' || action === 'open') {
      // Assuming writeBit is a function to write a boolean value to the PLC
      
      yaz(device,true);
      //res.send(`${device} açıldı`); // Use backticks for template literals
    }
    if (action === 'off' || action === 'close') {
        // Assuming writeBit is a function to write a boolean value to the PLC
        yaz(device,false);
        //res.send(`${device} kapatıldı`); // Use backticks for template literals
      }
  
    // Execute the corresponding function based on the received command
    
    console.log(`${device}/${action}`);
  
    res.sendStatus(200);
  });

//////////////////////////////////////////////////////

function handleWriteErrors(err) {
    if (err) {
      console.error('DEĞERLER YAZILIRKEN BİR HATA OLUŞTU!!!!', err);
      return;
    }
    console.log('Yazma işlemi tamamlandı.');
  }
  
  
//////////////////////////////////////////////////////////


// Default route handler for the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

// Function to execute the command based on the route
function executeCommand(command) {
  const [device, action] = command.split('/');

  // Implement the logic to send commands to the PLC based on device and action
  switch (device) {
    case 'Işık01':
    case 'Priz01':
    case 'Perde01':
    case 'Işık02':
    case 'Priz02':
    case 'Perde02':
    case 'Işık03':
    case 'Priz03':
    case 'Perde03':
    case 'Işık04':
    case 'Priz04' :
    case 'Perde04':
    case 'Işık05':
    case 'Priz05':
    case 'Perde05':
    case 'Işık06':
    case 'Priz06':
    case 'Perde06':
    case 'Işık07':
    case 'Priz07':
    case 'Perde07':
    case 'Işık08':
    case 'Priz08':
    case 'Perde08':
    case 'Işık09':
    case 'Priz09':
    case 'Perde09':
    case 'Işık010':
    case 'Priz010':
    case 'Perde010':
      sendPLCCommand(device, action);
      break;
    // Add more cases for other devices as needed
    default:
      break;
  }
}

// Function to send commands to the PLC
function sendPLCCommand(device, action) {
  const commandUrl = `http://${connectionParams.host}:${port}/${device.toLowerCase()}/${action.toLowerCase()}`;
  fetch(commandUrl, { method: 'POST' })
    .then(response => {
      if (!response.ok) {
        console.error(`Failed to send command to PLC: ${response.statusText}`);
      }
    })
    .catch(error => console.error('Error:', error));
}

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // Connect to the PLC when the server starts
  plc.initiateConnection(connectionParams, connected => {
    if (connected) {
      console.log('PLC Connection established');
    } else {
      console.error('Failed to establish PLC connection');
    }
  });
});

// Handle process termination to close the PLC connection
process.on('SIGINT', () => {
  plc.dropConnection(() => {
    console.log('PLC Connection closed');
    process.exit();
  });
});
