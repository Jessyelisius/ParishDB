const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const mailer = require('nodemailer');
const cron = require('node-cron');
require('dotenv').config();
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// At the top of your app.js, after the imports
console.log('✅ Server starting...');
console.log('📧 Email service:', process.env.service);
console.log('📬 Sending from:', process.env.email);

// Middleware
app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

const path = require('path');
// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/sjmcc_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

//mongoose
mongoose.set("strictQuery", true);
mongoose.set("runValidators", true);
mongoose
  .connect(process.env.Database_URI)
  .then(() => {
    console.log("db connected");

   })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });


app.get('/', (req, res) => {
  res.render('form');
});

app.get('/register', (req, res) => {
  res.render('form');
}); 


// Member Schema - Matches your existing database structure
const memberSchema = new mongoose.Schema({
  // Status
  parishionerStatus: { type: String, enum: ['New Parishioner', 'Parishioner'] },
  
  // Personal Information
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  group: String,
  stateOfOrigin: String,
  zone: Number,
  occupation: String,
  dateOfBirth: { type: Date, required: true },
  
  // Marital Status
  maritalStatus: { type: String, enum: ['Single', 'Married', 'Separated', 'Widowed'], required: true },
  numberOfKids: Number,
  
  // Catholic Sacraments
  baptism: { type: Boolean, default: false },
  firstHolyCommunion: { type: Boolean, default: false },
  confirmation: { type: Boolean, default: false },
  holyMatrimony: { type: Boolean, default: false },
  
  // Family Linking
  familyId: String,
  spouseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  memberType: { type: String, enum: ['Adult', 'Youth'], default: 'Adult' },
  
  // Spouse Information (for married couples)
  spouse: {
    fullName: String,
    email: String,
    phoneNumber: String,
    society: String,
    stateOfOrigin: String,
    dateOfBirth: Date,
    occupation: String,
    baptism: Boolean,
    holyCommunion: Boolean,
    confirmation: Boolean,
    matrimony: Boolean
  },
  
  // Ministry Involvement
  ministry: String,
  otherSkills: String,
  
  registrationDate: { type: Date, default: Date.now }
});

const Member = mongoose.model('Member', memberSchema);

// Email Configuration
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER || 'sjmccgidanmangoro@gmail.com',
//     pass: process.env.EMAIL_PASS || 'your-app-password'
//   }
// });

const transporter = mailer.createTransport({
  service: process.env.service,
  host: process.env.host,

  port: 465,
  secure: true,

  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const Sendmail = async (to, subject, html, many = false) => {
  try {
    const mailoption = {
      from: `${process.env.Company} <${process.env.email}>`,
      [many ? "bcc" : "to"]: to, //bcc for bulk, to for single
      //   ...{ bcc: to },
      subject: subject,
      html: html,
    };
    await transporter.sendMail(mailoption);
    return { sent: true };
  } catch (error) {
    console.log("Mail sending error:", error.message);
    return { error: error.message };
  }
};


// ROUTES

// Register Single Person
app.post('/api/register/single', async (req, res) => {
  try {
    const memberData = {
      ...req.body,
      maritalStatus: req.body.maritalStatus || 'Single',
      familyId: new mongoose.Types.ObjectId().toString(),
      memberType: 'Adult'
    };
    
    const member = new Member(memberData);
    await member.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Registration successful! Welcome to St. Joseph Mukasa Parish!',
      memberId: member._id 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Register Married Couple
app.post('/api/register/married', async (req, res) => {
  try {
    const familyId = new mongoose.Types.ObjectId().toString();
    
    // Create primary member (can be husband or wife)
    const primaryData = {
      parishionerStatus: req.body.parishionerStatus,
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      group: req.body.group,
      stateOfOrigin: req.body.stateOfOrigin,
      zone: req.body.zone,
      occupation: req.body.occupation,
      dateOfBirth: req.body.dateOfBirth,
      maritalStatus: 'Married',
      numberOfKids: req.body.numberOfKids,
      baptism: req.body.baptism,
      firstHolyCommunion: req.body.firstHolyCommunion,
      confirmation: req.body.confirmation,
      holyMatrimony: req.body.holyMatrimony,
      spouse: req.body.spouse,
      ministry: req.body.ministry,
      otherSkills: req.body.otherSkills,
      familyId,
      memberType: 'Adult'
    };
    
    const primaryMember = new Member(primaryData);
    await primaryMember.save();
    
    // Create spouse record
    if (req.body.spouse && req.body.spouse.fullName) {
      const spouseData = {
        parishionerStatus: req.body.parishionerStatus,
        fullName: req.body.spouse.fullName,
        email: req.body.spouse.email,
        phoneNumber: req.body.spouse.phoneNumber,
        address: req.body.address,
        group: req.body.spouse.society,
        stateOfOrigin: req.body.spouse.stateOfOrigin,
        zone: req.body.zone,
        occupation: req.body.spouse.occupation,
        dateOfBirth: req.body.spouse.dateOfBirth,
        maritalStatus: 'Married',
        numberOfKids: req.body.numberOfKids,
        baptism: req.body.spouse.baptism,
        firstHolyCommunion: req.body.spouse.holyCommunion,
        confirmation: req.body.spouse.confirmation,
        holyMatrimony: req.body.spouse.matrimony,
        familyId,
        spouseId: primaryMember._id,
        memberType: 'Adult'
      };
      
      const spouseMember = new Member(spouseData);
      await spouseMember.save();
      
      // Link back to primary member
      primaryMember.spouseId = spouseMember._id;
      await primaryMember.save();
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Couple registered successfully! Welcome to St. Joseph Mukasa parish family!',
      familyId
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Register Youth (18+) under existing family
app.post('/api/register/youth', async (req, res) => {
  try {
    const { familyId, ...youthData } = req.body;
    
    if (!familyId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please select your family first' 
      });
    }
    
    const youth = new Member({
      ...youthData,
      familyId,
      memberType: 'Youth'
    });
    
    await youth.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Youth registration successful!',
      memberId: youth._id 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Get all members
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find()
      .populate('spouseId', 'fullName email')
      .sort({ familyId: 1, registrationDate: -1 });
    res.json({ success: true, members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Search families for youth registration
app.get('/api/families/search', async (req, res) => {
  try {
    const { query } = req.query;
    const families = await Member.aggregate([
      { 
        $match: { 
          $or: [
            { fullName: new RegExp(query, 'i') },
            { 'spouse.fullName': new RegExp(query, 'i') }
          ],
          maritalStatus: 'Married'
        } 
      },
      { 
        $group: { 
          _id: '$familyId',
          primaryMember: { $first: '$$ROOT' }
        } 
      }
    ]);
    
    res.json({ success: true, families });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get birthday celebrants for current month
app.get('/api/birthdays/current-month', async (req, res) => {
  try {
    const currentMonth = new Date().getMonth() + 1;
    const members = await Member.aggregate([
      {
        $addFields: {
          birthMonth: { $month: '$dateOfBirth' },
          birthDay: { $dayOfMonth: '$dateOfBirth' }
        }
      },
      {
        $match: { birthMonth: currentMonth }
      },
      {
        $sort: { birthDay: 1 }
      }
    ]);
    
    // Also check spouse birthdays
    const spouseBirthdays = await Member.find({
      'spouse.dateOfBirth': { $exists: true }
    });
    
    const allBirthdays = [...members];
    spouseBirthdays.forEach(member => {
      if (member.spouse && member.spouse.dateOfBirth) {
        const spouseBirthMonth = new Date(member.spouse.dateOfBirth).getMonth() + 1;
        if (spouseBirthMonth === currentMonth) {
          allBirthdays.push({
            fullName: member.spouse.fullName,
            email: member.spouse.email,
            dateOfBirth: member.spouse.dateOfBirth,
            isSpouse: true
          });
        }
      }
    });
    
    res.json({ success: true, birthdays: allBirthdays });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// Test birthday email route
app.get('/api/test-birthday', async (req, res) => {
  try {
    console.log('🎂 Manual birthday email test triggered...');
    await sendBirthdayEmails();
    res.json({ 
      success: true, 
      message: 'Birthday email test completed! Check console for results.' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// http://localhost:5000/api/test-birthday


// Send birthday emails
async function sendBirthdayEmails() {
  try {
    const today = new Date();
    const members = await Member.find({
      $expr: {
        $and: [
          { $eq: [{ $month: '$dateOfBirth' }, today.getMonth() + 1] },
          { $eq: [{ $dayOfMonth: '$dateOfBirth' }, today.getDate()] }
        ]
      }
    });


    ///link to email images 
    // https://ibb.co/0RhJKqZv
    // https://ibb.co/SXt3ys2w
    // https://ibb.co/pBBnvQBN
  
    for (const member of members) {
      const firstName = member.fullName.split(' ')[0];
      
      // const birthdayHTML = `
      //   <!DOCTYPE html>
      //   <html>
      //   <head>
      //     <style>
      //       body { font-family: 'Open Sans', Arial, sans-serif; background: #fdfdfd; margin: 0; padding: 20px; }
      //       .card { background: #eceaea; border-radius: 15px; max-width: 600px; margin: 0 auto; padding: 40px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      //       .logo { width: 80px; height: 80px; margin: 0 auto 20px; }
      //       h1 { color: #1a5f3f; font-size: 2.5em; margin: 20px 0; }
      //       p { font-size: 18px; line-height: 1.8; color: #333; margin: 15px 0; }
      //       .blessing { background: linear-gradient(135deg, #1a5f3f 0%, #2d8f5f 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
      //       .footer { margin-top: 30px; color: #666; font-size: 16px; }
      //     </style>
      //   </head>
      //   <body>
      //     <div class="card">
      //       <h1>🎉 Happy Birthday, ${firstName}! 🎂</h1>
      //       <p>Wishing you a wonderful day filled with laughter!</p>
      //       <div class="blessing">
      //         <p><strong>As you celebrate your new age in the Lord, may heaven rejoice over you.</strong></p>
      //         <p>For you are surrounded with joy and mercy.</p>
      //       </div>
      //       <p>Here comes another reason to be joyous!</p>
      //       <p><strong>Have a Great One!</strong></p>
      //       <div class="footer">
      //         <p>With love and prayers,</p>
      //         <p><strong>St. Joseph Mukasa Parish</strong><br>Gidan Mangoro</p>
      //       </div>
      //     </div>
      //   </body>
      //   </html>
      // `;
      
      // Use your Sendmail function
      const birthdayHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: 'Open Sans', Arial, sans-serif; 
            background: #f0f0f0; 
            margin: 0; 
            padding: 20px; 
          }
          .email-wrapper {
            max-width: 650px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          }
          .header-image {
            width: 100%;
            height: 250px;
            background: linear-gradient(135deg, rgba(26, 95, 63, 0.9), rgba(45, 143, 95, 0.9)),
                        url('https://ibb.co/SXt3ys2w') center/cover;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            padding: 30px;
          }
          .jesuits-logo {
            width: 100px;
            height: 100px;
            margin-bottom: 15px;
            background: white;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          }
          .header-image h1 {
            font-size: 3em;
            margin: 10px 0;
            text-shadow: 2px 2px 10px rgba(0,0,0,0.3);
          }
          .content {
            padding: 40px 30px;
            text-align: center;
          }
          .content p {
            font-size: 18px;
            line-height: 1.8;
            color: #333;
            margin: 15px 0;
          }
          .blessing-box {
            background: linear-gradient(135deg, #1a5f3f 0%, #2d8f5f 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            margin: 30px 0;
            box-shadow: 0 10px 30px rgba(26, 95, 63, 0.3);
          }
          .blessing-box p {
            color: white;
            font-size: 19px;
            line-height: 1.7;
          }
          .balloons {
            font-size: 50px;
            margin: 20px 0;
            letter-spacing: 10px;
          }
          .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 3px solid #1a5f3f;
          }
          .footer p {
            color: #666;
            font-size: 16px;
            margin: 8px 0;
          }
          .parish-name {
            color: #1a5f3f;
            font-weight: bold;
            font-size: 20px;
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header-image">
            <img src="https://ibb.co/pBBnvQBN" alt="Jesuits" class="jesuits-logo">
            <h1>🎉 Happy Birthday! 🎂</h1>
          </div>
          
          <div class="content">
            <div class="balloons">🎈🎊🎁🎉</div>
            <h2 style="color: #1a5f3f; font-size: 2.2em; margin: 20px 0;">Dear ${firstName},</h2>
            <p>Wishing you a wonderful day filled with laughter and joy!</p>
            
            <div class="blessing-box">
              <p><strong>✨ As you celebrate your new age in the Lord, may heaven rejoice over you.</strong></p>
              <p>For you are surrounded with joy and mercy.</p>
              <p>🙏 May this new year of your life be filled with God's abundant blessings!</p>
            </div>
            
            <p style="font-size: 20px;"><strong>Here comes another reason to be joyous!</strong></p>
            <p style="font-size: 22px; color: #1a5f3f;"><strong>Have a Great One! 🎊</strong></p>
            <div class="balloons">🎂🍰🧁🎈</div>
          </div>
          
          <div class="footer">
            <p>With love and prayers,</p>
            <p class="parish-name">St. Joseph Mukasa Catholic Parish</p>
            <p>Gidan Mangoro</p>
            <p style="margin-top: 20px; font-size: 14px; color: #999;">
              "May the Lord bless you and keep you" - Numbers 6:24
            </p>
          </div>
        </div>
      </body>
      </html>
      `;
      
      const result = await Sendmail(
        member.email, 
        ' Happy Birthday from St. Joseph Mukasa Parish! 🎂',
        birthdayHTML
      );
      
      if (result.sent) {
        console.log(` Birthday email sent to ${member.fullName}`);
      } else {
        console.log(` Failed to send birthday email to ${member.fullName}:`, result.error);
      }
    }

     // Check spouse birthdays
    const spouseMembers = await Member.find({ 
      'spouse.dateOfBirth': { $exists: true } 
    });
    
    for (const member of spouseMembers) {
      if (member.spouse && member.spouse.dateOfBirth && member.spouse.email) {
        const spouseBirthDate = new Date(member.spouse.dateOfBirth);
        if (spouseBirthDate.getMonth() + 1 === today.getMonth() + 1 && 
            spouseBirthDate.getDate() === today.getDate()) {
          
          const spouseFirstName = member.spouse.fullName.split(' ')[0];
          const spouseBirthdayHTML = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { 
                font-family: 'Open Sans', Arial, sans-serif; 
                background: #f0f0f0; 
                margin: 0; 
                padding: 20px; 
              }
              .email-wrapper {
                max-width: 650px;
                margin: 0 auto;
                background: white;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0,0,0,0.2);
              }
              .header-image {
                width: 100%;
                height: 250px;
                background: linear-gradient(135deg, rgba(26, 95, 63, 0.9), rgba(45, 143, 95, 0.9)),
                            url('https://ibb.co/pBBnvQBN') center/cover;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                text-align: center;
                padding: 30px;
              }
              .jesuits-logo {
                width: 100px;
                height: 100px;
                margin-bottom: 15px;
                background: white;
                border-radius: 50%;
                padding: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
              }
              .header-image h1 {
                font-size: 3em;
                margin: 10px 0;
                text-shadow: 2px 2px 10px rgba(0,0,0,0.3);
              }
              .content {
                padding: 40px 30px;
                text-align: center;
              }
              .content p {
                font-size: 18px;
                line-height: 1.8;
                color: #333;
                margin: 15px 0;
              }
              .blessing-box {
                background: linear-gradient(135deg, #1a5f3f 0%, #2d8f5f 100%);
                color: white;
                padding: 30px;
                border-radius: 15px;
                margin: 30px 0;
                box-shadow: 0 10px 30px rgba(26, 95, 63, 0.3);
              }
              .blessing-box p {
                color: white;
                font-size: 19px;
                line-height: 1.7;
              }
              .balloons {
                font-size: 50px;
                margin: 20px 0;
                letter-spacing: 10px;
              }
              .footer {
                background: #f8f9fa;
                padding: 30px;
                text-align: center;
                border-top: 3px solid #1a5f3f;
              }
              .footer p {
                color: #666;
                font-size: 16px;
                margin: 8px 0;
              }
              .parish-name {
                color: #1a5f3f;
                font-weight: bold;
                font-size: 20px;
              }
            </style>
          </head>
          <body>
            <div class="email-wrapper">
              <div class="header-image">
                <img src="https://ibb.co/pBBnvQBN" alt="Jesuits" class="jesuits-logo">
                <h1>🎉 Happy Birthday! 🎂</h1>
              </div>
              
              <div class="content">
                <div class="balloons">🎈🎊🎁🎉</div>
                <h2 style="color: #1a5f3f; font-size: 2.2em; margin: 20px 0;">Dear ${spouseFirstName},</h2>
                <p>Wishing you a wonderful day filled with laughter and joy!</p>
                
                <div class="blessing-box">
                  <p><strong>✨ As you celebrate your new age in the Lord, may heaven rejoice over you.</strong></p>
                  <p>For you are surrounded with joy and mercy.</p>
                  <p>🙏 May this new year of your life be filled with God's abundant blessings!</p>
                </div>
                
                <p style="font-size: 20px;"><strong>Here comes another reason to be joyous!</strong></p>
                <p style="font-size: 22px; color: #1a5f3f;"><strong>Have a Great One! 🎊</strong></p>
                <div class="balloons">🎂🍰🧁🎈</div>
              </div>
              
              <div class="footer">
                <p>With love and prayers,</p>
                <p class="parish-name">St. Joseph Mukasa Catholic Parish</p>
                <p>Gidan Mangoro</p>
                <p style="margin-top: 20px; font-size: 14px; color: #999;">
                  "May the Lord bless you and keep you" - Numbers 6:24
                </p>
              </div>
            </div>
          </body>
          </html>
          `;
          
          const result = await Sendmail(
            member.spouse.email, 
            'Happy Birthday from St. Joseph Mukasa Parish! 🎂',
            spouseBirthdayHTML
          );
          
          if (result.sent) {
            console.log(` Birthday email sent to ${member.spouse.fullName}`);
          } else {
            console.log(` Failed to send birthday email to ${member.spouse.fullName}:`, result.error);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error sending birthday emails:', error);
  }
}

// Schedule birthday emails daily at 8:00 AM
// cron.schedule('0 8 * * *', () => {
//   console.log('⏰ Cron job triggered at:', new Date().toLocaleString());
//   console.log('Running birthday email job...');
//   sendBirthdayEmails();
// });

// To this (runs every minute):
cron.schedule('* * * * *', () => {
  console.log('⏰ Cron job triggered at:', new Date().toLocaleString());
  console.log('🎂 Running birthday email job...');
  sendBirthdayEmails();
});

// 404 handler - 
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

app.listen(PORT, () => {
  console.log(`St. Joseph Mukasa Parish Server running on port ${PORT}`);
  console.log('Database: sjmcc_db');
});