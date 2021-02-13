const Sequelize = require('sequelize');
const {STRING} = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acmeppt',{logging:false});

const User = conn.define('user',{
    name :{
      type: STRING,
      allowNull:false,
      unique:true
    }
});
const Place = conn.define('place',{
    name :{
      type: STRING,
      allowNull:false,
      unique:true
    }
});
const Thing = conn.define('thing',{
    name :{
      type: STRING,
      allowNull:false,
      unique:true
    }
});

Thing.belongsTo(User);
Place.belongsTo(User);
// User.belongsTo(Thing);
// User.belongsTo(Place);

const syncAndSeed = async()=>{
  await conn.sync({force:true});
  const [lucy, moe,larry] = await Promise.all(
      ['lucy', 'moe','larry'].map(name =>{
         return User.create({name}) 
      }));
      console.log(lucy);
  const [NYC,Chicago,LA,Dallas] = await Promise.all(
        ['NYC','Chicago','LA','Dallas'].map(name =>{
         return  Place.create({name}) 
        }));
        console.log(NYC);
  const [foo, bar,bazz,quq] = await Promise.all(
      ['foo', 'bar','bazz','quq'].map(name =>{
        return Thing.create({name}) 
      }));
    
    // foo.userId = lucy.id;
    // bar.userId = lucy.id;
    // bazz.userId = lucy.id;
    // quq.userId = lucy.id;
    [foo, bar,bazz,quq].forEach(action=>{
        action.userId = larry.id;
        // action.save();
    });
    // [foo, bar,bazz,quq].forEach(action=>{
    //     action.userId = moe.id;
    // })
    // [foo, bar,bazz,quq].forEach(action=>{
    //     action.userId = larry.id;
    // })
    // [NYC,Chicago,LA,Dallas].forEach(place=>{
    //     place.userId = lucy.id;
    // })
    // [NYC,Chicago,LA,Dallas].forEach(place=>{
    //     place.userId = moe.id;
    // })
    // NYC.userId = larry.id;
    // Chicago.userId = larry.id;
    // // // bazz.userId = lucy.id;
    // // // quq.userId = lucy.id;

    // console.log(NYC,Chicago,LA,Dallas);
    [NYC,Chicago,LA,Dallas].forEach(place=>{
        console.log(place);
        place.update({userId:moe.id})
        // place.userId = lucy.id;
        // place.save();
        //77 promise??

     });
    
    // await Promise.all([NYC.save(),Chicago.save(),LA.save(),Dallas.save(),foo.save(),bar.save(),bazz.save(),quq.save()])
    // await Promise.all([User.save(),Place.save(),Thing.save()]);
    console.log(foo.get());
     console.log('Hi');
};

syncAndSeed();


module.exports = {
    syncAndSeed,
    models:{
        User,
        Place,
        Thing
    }
};