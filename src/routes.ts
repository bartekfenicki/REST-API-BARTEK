import {Router, Request, Response} from 'express';
import { addCity, getAllCities, getCityById, deleteCityById, updateCityById } from './controllers/cityController';
import { addCountry, getCountryById, deleteCountryById, updateCountryById, getAllCountries } from './controllers/countryController';
import { registerUser, loginUser, verifyToken } from './controllers/authController';
const router: Router = Router();

// Home route
router.get('/', (req: Request, res: Response) => {
  res.status(200).send('Welcome to Bartek Fenickis REST API');
});

// City routes
router.post('/cities', verifyToken, addCity);
router.get('/cities', getAllCities);
router.get('/cities/:id', getCityById);
router.put('/cities/:id', verifyToken, updateCityById);
router.delete('/cities/:id', verifyToken, deleteCityById);

// Country routes
router.post('/countries', verifyToken, addCountry);
router.get('/countries', getAllCountries);
router.get('/countries/:id', getCountryById);
router.put('/countries/:id', verifyToken, updateCountryById);
router.delete('/countries/:id', verifyToken, deleteCountryById);

// Auth routes

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);

// swagger docs

//                                <----home
/**
 * @swagger
 * /:
 *  get:
 *   tags: 
 *   - App Routes
 *   summary: Health Check
 *   description: Welcome to my REST API
 *   responses:
 *     200:
 *       description: The server is working properly.
 */


//                              <-----cities
//add city
/**
 * @swagger
 * /cities:
 *  post:
 *   tags:
 *   - City Routes
 *   summary: Add a new city
 *   description: Add a new city
 *   security:
 *     - ApiKeyAuth: []
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/City'
 *   responses:
 *     200:
 *       description: City Added successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/City'
 *     500:
 *       description: Error adding city
 *      
 */

//get all cities
/**
 * @swagger
 * /cities:
 *  get:
 *   tags:
 *    - City Routes
 *   summary: get all cities
 *   description: get all cities fetched
 *   responses:
 *     200:
 *       description: Cities fetched successfully
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/City'
 *     500:
 *       description: Error fetching cities
 *      
 */

//get city by id
/**
 * @swagger
 * /cities/{id}:
 *  get:
 *   tags:
 *    - City Routes
 *   summary: get a specific city
 *   description: get a specific city fetched
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the city to fetch
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: City fetched successfully
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/City'
 *     500:
 *       description: Error fetching a city
 *      
 */


// update city
/**
 * @swagger
 * /cities/{id}:
 *  put:
 *   tags:
 *     - City Routes
 *   summary: updates a city
 *   description: updates a specific city 
 *   security:
 *     - ApiKeyAuth: []
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the city to update
 *       schema:
 *         type: string
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/City'
 * 
 *   responses:
 *     200:
 *       description: City updated successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/City'
 *     500:
 *       description: Error adding city
 *      
 */

//delete city
/**
 * @swagger
 * /cities/{id}:
 *  delete:
 *   tags:
 *     - City Routes
 *   summary: delete a city
 *   description: delete a city
 *   security:
 *     - ApiKeyAuth: []
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the city to delete
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: City deleted successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/City'
 *     500:
 *      description: Error deleting city
 *      
 */

//                              <-----COUNTRIES
//add country
/**
 * @swagger
 * /countries:
 *  post:
 *   tags:
 *   - Country Routes
 *   summary: Add a new country
 *   description: Add a new country
 *   security:
 *     - ApiKeyAuth: []
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Country'
 *   responses:
 *     200:
 *       description: Country Added successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Country'
 *     500:
 *       description: Error adding Country
 *      
 */

//get all countries
/**
 * @swagger
 * /countries:
 *  get:
 *   tags:
 *    - Country Routes
 *   summary: Get all Countries
 *   description: Get all Countries fetched
 *   responses:
 *     200:
 *       description: Countries fetched successfully
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Country'
 *     500:
 *       description: Error fetching Countries
 *      
 */

//get country by id
/**
 * @swagger
 * /countries/{id}:
 *  get:
 *   tags:
 *    - Country Routes
 *   summary: Get a specific Country
 *   description: Get a specific Country fetched
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the country to fetch
 *      schema:
 *        type: string
 *   responses:
 *     200:
 *       description: Country fetched successfully
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Country'
 *     500:
 *       description: Error fetching a Country  
 *      
 */


// update city
/**
 * @swagger
 * /countries/{id}:
 *  put:
 *   tags:
 *     - Country Routes
 *   summary: Updates a Country
 *   description: Updates a specific Country 
 *   security:
 *     - ApiKeyAuth: []
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the Country to update
 *       schema:
 *         type: string
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Country'
 * 
 *   responses:
 *     200:
 *       description: Country updated successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Country'
 *     500:
 *       description: Error adding Country
 *      
 */

//delete Country
/**
 * @swagger
 * /countries/{id}:
 *  delete:
 *   tags:
 *     - Country Routes
 *   summary: Delete a Country
 *   description: Delete a Country
 *   security:
 *     - ApiKeyAuth: []
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID of the country to delete
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: Country deleted successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Country'
 *     500:
 *      description: Error deleting Country
 *      
 */


//                             <-----USERS
//user register
/**
 * @swagger
 * /user/register:
 *  post:
 *   tags:
 *   - Auth Routes
 *   summary: Register a new user
 *   description: Register a new user
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *   responses:
 *     200:
 *       description: User registered successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *             error: 
 *              type: string
 *             _id:
 *              type: string
 *      
 */

//user login
/**
 * @swagger
 * /user/login:
 *  post:
 *   tags:
 *   - Auth Routes
 *   summary: Log in to an existing user account
 *   description: Log in to an existing user account
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *   responses:
 *     200:
 *       description: User logged in successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *             error: 
 *              type: string
 *             _id:
 *              type: string
 *      
 */



//{
//   "name": "Poland",
//   "capital": "Warsaw",
//   "area": 322 575,
//   "population": 36,69,
//   "currency": "PLN",
//   "description": "A central European Country",
//   "imageURL": "https://piscum.photos/500/500"
// }


export default router;