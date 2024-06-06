import React from 'react';

function TrainFlood() {
  return (
    <div className="flex h-screen">
      {/* <iframe
        src="trainflood.html"
        title="Train HTML"
        className="w-2/3 h-full"
      ></iframe> */}
      <div className="w-1/3 h-full p-4">
        {/* Information related to the iframe */}
        <h1 className="text-3xl font-bold text-center">Train Flood Information</h1>
        <p className="mt-4">
          This page is currently under-construction.<br></br>
        </p>
        <ul className="list-disc ml-5 mt-4">
          <li>Current status of the flood</li>
          <li>Affected areas</li>
          <li>Rescue operations underway</li>
          <li>Contact information for help</li>
          <li>Preventive measures</li>
        </ul>
      </div>
    </div>
  );
}

export default TrainFlood;
