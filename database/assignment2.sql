
-- Task One - Write SQL Statements  Query INSERT 
 INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
-- VALUES (Tony, Stark, tony@starkent.com, Iam1ronM@n);


-- Query UPDATE the field account_type
 UPDATE public.account 
 SET account_type = 'Admin'
 WHERE account_firstname = 'Tony';

-- Query DELETE the record Tony from account_type
 DELETE public.account
 WHERE account_firstname = 'Tony';

-- Query UPDATE the field inv_description of table inventory

 UPDATE public.inventory
 SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
 WHERE inv_make = 'GM' and inv_model = 'Hummer';

-- The select query using a JOIN SQL statement works

SELECT inv_make, inv_model, classification_name
FROM
	inventory b
INNER JOIN classification a
    ON a.classification_id = b.classification_id
WHERE 
   classification_name = 'Sport'



-- The inv_image and inv_thumbnail update query works 

UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/inv_images/', '/inv_images/vehicles/') , 
    inv_thumbnail = REPLACE(inv_thumbnail, '/inv_images/', '/inv_images/vehicles/'); 

-- The SQL file containing all queries to build the type, tables and insert data is present and works
-- Obj. 4 value: Refer to grade book


