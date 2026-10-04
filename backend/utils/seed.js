require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');
const SiteImage = require('../models/SiteImage');
const Impact = require('../models/Impact');
const Project = require('../models/Project');

// Every editable photo slot referenced by the frontend's <EditableImage keyName="..." /> component.
// Placeholder images are used until the admin uploads real photos from the admin panel.
const PLACEHOLDER = 'https://placehold.co/1200x800/1a1f2e/f97316?text=IGNITRON';

const imageSlots = [
  { key: 'hero_banner', label: 'Homepage Hero Banner', page: 'home', altText: 'Students building a robotics project' },
  { key: 'ecosystem_learn', label: 'Ecosystem - Learn Icon Image', page: 'home' },
  { key: 'atl_teaser', label: 'Homepage ATL Labs Teaser Image', page: 'home' },
  { key: 'atl_hero', label: 'ATL Labs Page Hero Image', page: 'atl' },
  { key: 'about_hero', label: 'About Page Hero Image', page: 'about' },
  { key: 'about_team', label: 'About Page Team Photo', page: 'about' },
  { key: 'kits_hero', label: 'DIY Kits Hero Image', page: 'kits' },
  { key: 'final_cta_bg', label: 'Final CTA Section Background', page: 'home' },
  { key: 'gallery_hero', label: 'Gallery Page Hero Image', page: 'gallery' },
  { key: 'resources_hero', label: 'Resources Page Hero Image', page: 'resources' },
  { key: 'contact_hero', label: 'Contact Page Hero Image', page: 'contact' },
  { key: 'logo', label: 'Site Logo', page: 'general' },
];

const seed = async () => {
  await connectDB();

  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@ignitron.com').toLowerCase();
  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await Admin.create({
      name: 'IGNITRON Admin',
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || 'ChangeMe@123',
    });
    console.log(`Admin created -> ${adminEmail}`);
  } else {
    console.log('Admin already exists, skipping.');
  }

  for (const slot of imageSlots) {
    const exists = await SiteImage.findOne({ key: slot.key });
    if (!exists) {
      await SiteImage.create({ ...slot, imageUrl: PLACEHOLDER });
    }
  }
  console.log('Image slots ensured.');

  const impactCount = await Impact.countDocuments();
  if (impactCount === 0) {
    await Impact.insertMany([
      { label: 'Schools', value: 100, suffix: '+', order: 1 },
      { label: 'Students', value: 2000, suffix: '+', order: 2 },
      { label: 'Projects', value: 500, suffix: '+', order: 3 },
      { label: 'Workshops', value: 50, suffix: '+', order: 4 },
    ]);
    console.log('Sample impact stats created.');
  }

  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany([
      {
        title: 'Obstacle Avoiding Robot',
        slug: 'obstacle-avoiding-robot',
        coverImage: PLACEHOLDER,
        difficulty: 'Beginner',
        category: 'Robotics',
        technologies: ['Arduino', 'Ultrasonic Sensor'],
        skills: ['Circuit Design', 'Basic Programming'],
        timeRequired: '2-3 hours',
        overview: 'Build a robot that automatically detects and avoids obstacles using an ultrasonic sensor.',
        whatYouLearn: ['Sensor interfacing', 'Motor driver control', 'Basic C++ for Arduino'],
        components: [
          { name: 'Arduino Uno', quantity: '1' },
          { name: 'Ultrasonic Sensor (HC-SR04)', quantity: '1' },
          { name: 'L298N Motor Driver', quantity: '1' },
          { name: 'BO Motors', quantity: '2' },
        ],
        howToMake: [
          'Assemble the chassis and mount the motors.',
          'Connect the motor driver to the Arduino.',
          'Wire the ultrasonic sensor to the front of the chassis.',
          'Upload the obstacle-avoidance code and test.',
        ],
        code: '// Sample Arduino sketch\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // obstacle detection logic here\n}',
        codeLanguage: 'cpp',
        troubleshooting: [{ issue: 'Robot moves erratically', fix: 'Check motor driver wiring polarity.' }],
        challenge: 'Add a second sensor to detect obstacles on both sides.',
        upgradeIdeas: ['Add Bluetooth control', 'Add line-following capability'],
        isFeatured: true,
      },
      {
        title: 'Smart Home Automation',
        slug: 'smart-home-automation',
        coverImage: PLACEHOLDER,
        difficulty: 'Intermediate',
        category: 'IoT',
        technologies: ['ESP32', 'Relay Module', 'Blynk'],
        skills: ['IoT protocols', 'Mobile app integration'],
        timeRequired: '4-5 hours',
        overview: 'Control home appliances remotely using an ESP32 and a mobile app.',
        whatYouLearn: ['Wi-Fi based IoT communication', 'Relay switching', 'Cloud dashboard integration'],
        components: [{ name: 'ESP32', quantity: '1' }, { name: '4-Channel Relay Module', quantity: '1' }],
        howToMake: ['Set up the ESP32 with Wi-Fi credentials.', 'Wire relays to appliances safely.', 'Connect to the mobile dashboard.'],
        code: '// ESP32 relay control sample',
        codeLanguage: 'cpp',
        isFeatured: true,
      },
      {
        title: 'Weather Monitoring Station',
        slug: 'weather-monitoring-station',
        coverImage: PLACEHOLDER,
        difficulty: 'Intermediate',
        category: 'IoT',
        technologies: ['ESP32', 'DHT22 Sensor'],
        skills: ['Data logging', 'IoT dashboards'],
        overview: 'Track temperature, humidity and pressure with live cloud updates.',
        whatYouLearn: ['Sensor calibration', 'Cloud data visualization'],
        components: [{ name: 'ESP32', quantity: '1' }, { name: 'DHT22 Sensor', quantity: '1' }],
        howToMake: ['Wire the sensor to the ESP32.', 'Push readings to a cloud dashboard.'],
        isFeatured: true,
      },
      {
        title: 'Robotic Arm',
        slug: 'robotic-arm',
        coverImage: PLACEHOLDER,
        difficulty: 'Advanced',
        category: 'Robotics',
        technologies: ['Servo Motors', 'Arduino'],
        skills: ['Inverse kinematics basics', 'Mechanical design'],
        overview: 'Build a 4-DOF robotic arm capable of pick-and-place operations.',
        whatYouLearn: ['Servo control', 'Mechanical linkages'],
        components: [{ name: 'Arduino Uno', quantity: '1' }, { name: 'Servo Motors', quantity: '4' }],
        howToMake: ['Assemble the arm frame.', 'Mount and calibrate servos.', 'Program pick-and-place sequences.'],
        isFeatured: true,
      },
      {
        title: 'Mini Drone',
        slug: 'mini-drone',
        coverImage: PLACEHOLDER,
        difficulty: 'Advanced',
        category: 'Electronics',
        technologies: ['Flight Controller', 'Brushless Motors'],
        skills: ['Flight dynamics', 'PID tuning'],
        overview: 'Assemble and fly a mini quadcopter drone from scratch.',
        whatYouLearn: ['Flight controller setup', 'PID tuning basics'],
        components: [{ name: 'Flight Controller', quantity: '1' }, { name: 'Brushless Motors', quantity: '4' }],
        howToMake: ['Assemble the frame.', 'Mount motors and ESCs.', 'Configure and tune the flight controller.'],
        isFeatured: true,
      },
    ]);
    console.log('Sample projects created.');
  }

  console.log('Seed complete.');
  mongoose.connection.close();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
