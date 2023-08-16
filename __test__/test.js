const request = require('supertest');
const app = require('../app');
const bcrypt = require("bcrypt");
const hashedPassword = bcrypt.hash('123123', 12);

// User Register 
describe('/players - Register', () => {
    describe("SUCCESS CASE: ", () => {
      it('should return 201 - Register User', async () => {
        try {
          const res = await request(app)
            .post('/players')
            .send({
                Email: 'testing2@gmail.com',
                Username: 'testing3',
                Password: hashedPassword,
                Total_score: 0 ,
                Biodata: 'Testing DB' ,
                City: 'Yogyakarta',
                image_url: ''
            })
          expect(res.status).toBe(201)
          expect(res.body).toBeInstanceOf(Object);
        } catch (error) {
          console.log(error, '<========================');
        }
  
      });
    })
  
//! Failed testing register - Empty format email
describe('FAILED CASE: ', () => {
    it('should return 404 - Empty format email', async () => {
    const res = await request(app)
    .post('/players')
    .send({
        Email: '',
        Username: 'testing1',
        Password: hashedPassword,
        Total_score: 0 ,
        Biodata: 'Testing DB' ,
        City: 'Yogyakarta',
        image_url: ''
    })
    expect(res.status).toBe(404)
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toContain('username or email cannot empty');
    });
    it('should return 404 - Empty Password', async () => {
        const res = await request(app)
        .post('/players')
        .send({
            Email: 'testing1@gmail.com',
            Username: 'testing1',
            Password: '',
            Total_score: 0 ,
            Biodata: 'Testing DB' ,
            City: 'Yogyakarta',
            image_url: ''
        })
        expect(res.status).toBe(404)
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toContain('password cannot be empty');
    })
    });
    })

// User Login 
describe('/auth/login - Login', () => {
    describe("SUCCESS CASE: ", () => {
        it('should return 200 - Login User', async () => {
        try {
            const res = await request(app)
            .post('/auth/login')
            .send({
                Email: 'testing1@gmail.com',
                Username: 'testing1',
                Password: hashedPassword,
                Total_score: 0 ,
                Biodata: 'Testing DB' ,
                City: 'Yogyakarta',
                image_url: ''
            })
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object);
        } catch (error) {
            console.log(error, '<========================');
        }
    
        });
    })
})
