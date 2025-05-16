

const bio = {
    first_name : "Vishal",
    middle_name : "Singh",
    last_name : "Jhajhria",
    community : "Jaat",
    nationality : "Indian",
    age : "23",
    village : "Hindwan",
    district : "Hisar",
    state : "Haryana",
    pin_code : 125001,

    address : function(){
        return ` VPO ${this.village}, ${this.district}, ${this.state} , ${this.pin_code}`
    },
    full_name : function (){
        return ` ${this.first_name} ${this.middle_name} ${this.last_name}`
    }
}

const phone_no = 9992425459;

// console.log.add = (a,b) => a+b;
// console.log.sub = (a,b) => a-b;

// module.exports => 1 time , always override
// module.exports.a , module.exports.b => as many as want
module.exports = {bio,phone_no};