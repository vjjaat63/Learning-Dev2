const fs = require('fs');

/*--------------------------File Writing -------------------------------*>

// fs.writeFile('./asyncfile.txt', 'The file is created asynchronously', (err) => {
  //   if (err) console.log(err);
  //   console.log('File written successfully.');
  // });
  
  // fs.writeFileSync('./syncfile.txt', 'The file is created synchronously')
  
  /*--------------------------File Reading -------------------------------*/
// try {
//   // const asyncdata = fs.readFile('./asyncfile.txt','utf-8',()=>{}) // returns nothing : undefined
//   const asyncdata = fs.readFile('asyncfile.txt','utf-8',(err,result)=>{
//     if(err) console.log(err);
//     else console.log(result);
//   })
//   // console.log(asyncdata);
// } catch (error) {
//   console.log("Error while reading file synchronously : ", error.name)
// }
// try {
//   const syncdata = fs.readFileSync('./syncfile.txt','utf-8')  // returns value
//   console.log(syncdata);
// } catch (error) {
//   console.log("Error while reading file synchronously : ", error.name)
// }

// There are appendFile and appendFileSync to append data avoiding oveeriding
/*--------------------------File Appending -------------------------------*/

// fs.appendFile('./asyncfile.txt'," appended using fs.appendFile",(err)=>{
// if(err) console.log(err);
// else console.log("data appended successfully.")
// });
// fs.appendFileSync('./syncfile.txt'," appended using fs.appendfileSync")

/*--------------------------File copying -------------------------------*/
// fs.cp and fs.cpSync to copy file
// fs.cp('./asyncfile.txt', './copyasync.txt', (err) => {
//   if (err) console.log(err);
//   else console.log("copied asyncfile successfully");
// })
// fs.cpSync('./syncfile.txt','./copysync')
/*--------------------------File Deleting (unlinking)-------------------------------*/

// fs.unlinkSync('./copySync.txt')
// fs.unlink('./copyasync.txt',(err)=>{
//     if (err) console.log(err);
//     else console.log("Deleted asyncfile successfully");
// })

/*-------------------------Status of File--------------------------------*/

fs.stat('./asyncfile.txt', (error, stats) => {
  if (error) console.log("Unable to get stats of ./asyncfile.txt ")
  else console.log(stats);
})
// let stats = fs.statSync('./syncfile.txt')
// console.log(stats)

/*-------------------------Make directory--------------------------------*/

// fs.mkdirSync('Don/a/n/m/j/h/h/g/ff', { recursive: true })

/*-------------------------Remove directory--------------------------------*/
// fs.rmdirSync('Don', { recursive: true}) // deletes only empty file

// fs.rmSync('Don', { recursive: true, force: true }); // ✅ Works for non-empty directories


const os = require('os')

console.log(os.cpus().length)