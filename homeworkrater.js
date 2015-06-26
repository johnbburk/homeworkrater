
var partitionTables2 = function(documents){
    var tables = [];
    var currentPage = 0;
    var tableNumber = 0;
    documents.forEach(function(entry){
        if(currentPage == 0 || entry.page!=currentPage)
        {
            tables[tableNumber]={rows:[]};
            currentPage = entry.page;
            tableNumber++;
        };
        tables[tableNumber-1].rows.push(entry);
    });
    return tables;
};

var listElements = function(documents){
    console.log("listing");
    console.log("counting size of document"+_.size(documents));
    _.each(documents,function(doc){
        console.log(doc);
    });
};


var pageTotals=function(documents){
  var probTable=[];

    documents.forEach(function(entry){

        var i=1;
        console.log("i is "+i);
        console.log("entry.page is "+entry.page);
        console.log("probTable[entry.page] is "+probTable[entry.page]);
        if (typeof probTable[entry.page]==='undefined')
        {

            //create new array if it doesn't exist
            probTable[entry.page] = [0,0,0,0,0,0,0,0,0,0,0,0,0];
        }
        _.each(entry.problems, function(prob){

            if (typeof probTable[entry.page][i]==='undefined')
            {
                probTable[entry.page] = 0;
            }


           if(prob)
           {
               probTable[entry.page][i]++
               console.log("incrementing page "+entry.page+" problem "+i+"to "+probTable[entry.page][i])
           }
            i++;

       });


    });
    console.log(probTable);
    return probTable;
};

var printPageTotals=function(document)
{

};


Homework = new Mongo.Collection("homework");
Homework.attachSchema(new SimpleSchema({
    userId:{
        type: String,
        autoValue:function(){return this.userId},

    },
    userName:{
        type: String,
        autoValue:function(){return Meteor.users.findOne({_id: this.userId}).emails[0].address},
    },
    fName:{
        type: String,
        autoValue:function(){return Meteor.users.findOne({_id: this.userId}).profile.fName},
    },
    lName:{
        type: String,
        autoValue:function(){return Meteor.users.findOne({_id: this.userId}).profile.lName},
    },
    dateCreated:{
        type: Date,
        autoValue:function(){return new Date()},
    },

    page: {
        type: Number,
        label: "Page Number",
        max: 200
    },

    problems:{
        type: Object,
    },
    'problems.one':{
    type: Boolean,
        label: "Problem 1"

    },
    'problems.two':{
        type: Boolean,
        label: "Problem 2"

    },
    'problems.three':{
        type: Boolean,
        label: "Problem 3"

    },
    'problems.four':{
        type: Boolean,
        label: "Problem 4"
    },
    'problems.five':{
        type: Boolean,
        label: "Problem 5"
    },
    'problems.six':{
        type: Boolean,
        label: "Problem 6"
    },
    'problems.seven':{
        type: Boolean,
        label: "Problem 7"
    },
    'problems.eight':{
        type: Boolean,
        label: "Problem 8"
    },
    'problems.nine':{
        type: Boolean,
        label: "Problem 9"
    },
    'problems.ten':{
        type: Boolean,
        label: "Problem 10"
    },
    'problems.eleven':{
        type: Boolean,
        label: "Problem 11"
    },
    'problems.twelve':{
        type: Boolean,
        label: "Problem 12"
    },

}));


if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);


    Template.registerHelper('formatDate', function(date) {
        return moment(date).format('MM-DD-YYYY');
    });

    Template.results.helpers({

        Homework: function() {
           var hw= Homework.find({},{sort:{page:-1}});
           hw.forEach(function(pg){
               var i = 1;
               _.each(pg.problems,function(problem){
                    i++;
               });
           }) ;

        },

        Name: function() {
            return Meteor.user().lName();
        },

        Problems: function(probelms) {
            _.each(problems,function(problem){
                i++;
            });

        }


    });


    Template.results2.helpers({

        Homework: function() {
            console.log(_.size(Homework.find({},{sort:{page:-1}})));
            return Homework.find({},{sort:{page:-1}});

        },

        Name: function() {
            return Meteor.user().lName();
        },

        Problems: function(probelms) {
            text = ""
            var i =1;
            _.each(this.problems,function(problem){

                if(problem){
                    text+=i+", ";
                }
                i++;
            });
            return text;
        }


    });

    Template.results3.helpers({

        Pages: function() {

            var pgs=Homework.find({},{sort:{page:-1}});
            //console.log();
           var probTotals = pageTotals(Homework.find({},{sort:{page:-1}}));
            return partitionTables2(pgs);

        },

        Name: function() {
            return Meteor.user().lName();
        },



        Problems: function(probelms) {
            text = ""
            var i =1;
            _.each(this.problems,function(problem){

                if(problem){
                    text+=i+", ";
                }//console.log(i+" "+problem);
                i++;
            });
            return text;
        },

        Summary: function(page)
        {
            var probTotals = pageTotals(Homework.find({},{sort:{page:-1}}));
            var text ="test"
            return text;

        }


    });




    Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });


    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


AccountsTemplates.configure({
    enablePasswordChange: true,
    showForgotPasswordLink: true,
});


AccountsTemplates.addField({
    _id: "class",
    type: "select",
    displayName: "Class",
    select: [
        {
            text: "Problem Solving in Algebra and Geometry (Finch)",
            value: "Finch1",
        },
        {
            text: "Problem Solving in Algebra and Geometry (McGowan)",
            value: "McGowan1",
        },
    ],

});

AccountsTemplates.addField({

    _id: "username",
        type: "text",
    displayName: "username",
    required: true,
    minLength: 5,
});


AccountsTemplates.addField({
    _id: "fName",
    type: "text",
    displayName: "First Name",
});

AccountsTemplates.addField({
    _id: "lName",
    type: "text",
    displayName: "Last Name",
});




