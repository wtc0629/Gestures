export const countDown = (waitTime,doSomethingDuringCountDown,doSomethingAfterCountDown,checkPause) => {
  
    if (waitTime > 0) {
    waitTime--;
     if(doSomethingDuringCountDown){
      console.log(10,waitTime);
      if(checkPause){
      waitTime++;
      console.log(20,waitTime);
       }   else{
        console.log(30,waitTime);
      doSomethingDuringCountDown(waitTime)
    }
     } 
    } else {
     if(doSomethingAfterCountDown){
      doSomethingAfterCountDown()
     } 
     return;
    }
    setTimeout(() => {
     countDown(waitTime,doSomethingDuringCountDown,doSomethingAfterCountDown);
    }, 1000);
  
  }