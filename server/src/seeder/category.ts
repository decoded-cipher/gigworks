
import { createCategory } from '../services/category.ts';
import { createSubCategory } from '../services/subCategory.ts';
import { createSubCategoryOption } from '../services/subCategoryOption.ts';

const data = {
	"categories": [


	
	//   {
	// 	"name": "Sales & Retail",
	// 	"sub_categories": [
	// 	  {
	// 		"name": "Retail Stores",
	// 		"sub_category_options": [
	// 		  "Textiles",
	// 		  "Shoes & Footwear",
	// 		  "Supermarket",
	// 		  "Shops and Stores",
	// 		  "Tailoring items",
	// 		  "Stationery",
	// 		  "Books",
	// 		  "Gift and Fancy",
	// 		  "Mobile Phone",
	// 		  "Gadgets",
	// 		  "Florist",
	// 		  "Fruits Shop",
	// 		  "Lottery",
	// 		  "Watch",
	// 		  "Jewellery",
	// 		  "Clothing/Apparel"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Wholesale & Distribution",
	// 		"sub_category_options": [
	// 		  "Wholesale Supplier of Meat",
	// 		  "Wholesale Supplier",
	// 		  "Packaged Drinking Water",
	// 		  "Chemicals",
	// 		  "Adhesives",
	// 		  "Timber",
	// 		  "Building Material",
	// 		  "Spices",
	// 		  "Coconut Products",
	// 		  "Fruits Shop",
	// 		  "Flavours and Fragrance",
	// 		  "Plastic Products",
	// 		  "Paper Products"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Specialty Shops",
	// 		"sub_category_options": [
	// 		  "Aquarium",
	// 		  "Pet Stores/Kennels",
	// 		  "Bakery",
	// 		  "Cakes",
	// 		  "Candles",
	// 		  "Plants and Garden Supplies"
	// 		]
	// 	  }
	// 	]
	//   },
	//   {
	// 	"name": "Services",
	// 	"sub_categories": [
	// 	  {
	// 		"name": "Professional Services",
	// 		"sub_category_options": [
	// 		  "Accountants",
	// 		  "Accreditation",
	// 		  "Auditors",
	// 		  "Notary",
	// 		  "Legal Services",
	// 		  "Advocates",
	// 		  "Business Consultants",
	// 		  "Counselling Services",
	// 		  "Tax Services",
	// 		  "Immigration Checks",
	// 		  "Liaison & Public Relations"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Personal Services",
	// 		"sub_category_options": [
	// 		  "Beauty Care",
	// 		  "Baby Care",
	// 		  "Family Counselling Centre",
	// 		  "Day Care/Play School",
	// 		  "Professional Nursing Care Services",
	// 		  "Driving Schools",
	// 		  "Self Defence Training"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Home Services",
	// 		"sub_category_options": [
	// 		  "House Painting & Wood Polishing",
	// 		  "Plumber/Electrician",
	// 		  "Septic Tank Manufacturers",
	// 		  "Plumbing And Sanitary",
	// 		  "Home Nursing",
	// 		  "House Cleaning Services",
	// 		  "Home Decoration & Furnishing",
	// 		  "Upholstery",
	// 		  "Pest Control"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "IT & Digital Services",
	// 		"sub_category_options": [
	// 		  "Software & Web Development",
	// 		  "IT Services",
	// 		  "Internet Services",
	// 		  "Lead Generation",
	// 		  "Branding",
	// 		  "Social Media Marketing",
	// 		  "Graphic Design & Digital Art",
	// 		  "Content Creation & Media Services",
	// 		  "Internet & Digital Services",
	// 		  "Video & Audio Production",
	// 		  "Printing, Photostat, Fax"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Financial Services",
	// 		"sub_category_options": [
	// 		  "Banks",
	// 		  "Insurance Services",
	// 		  "Finance and Banking",
	// 		  "Investments",
	// 		  "Loan Services"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Healthcare Services",
	// 		"sub_category_options": [
	// 		  "Hospitals",
	// 		  "Clinics",
	// 		  "Pharmacy",
	// 		  "Doctors",
	// 		  "Eye Care",
	// 		  "Dental Care",
	// 		  "Healthcare",
	// 		  "Emergency Medical Services (Ambulance)",
	// 		  "Blood Banks"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Consulting & Advisory",
	// 		"sub_category_options": [
	// 		  "Business Consulting",
	// 		  "Education Consulting",
	// 		  "Career Counseling",
	// 		  "Training Centers",
	// 		  "Marketing & PR",
	// 		  "Environmental Consulting",
	// 		  "Acoustic Consultants"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Construction & Maintenance",
	// 		"sub_category_options": [
	// 		  "Builders & Developers",
	// 		  "Building Material",
	// 		  "Building Construction",
	// 		  "Interior Design",
	// 		  "Roofing Solutions",
	// 		  "Civil Contractors",
	// 		  "Electrical & Plumbing Contractors",
	// 		  "Home Improvement"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Transportation & Logistics",
	// 		"sub_category_options": [
	// 		  "Cargo Services",
	// 		  "Taxi Services",
	// 		  "Transportation Services",
	// 		  "Packers and Movers",
	// 		  "Warehouse Services",
	// 		  "Shipping Services"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Entertainment & Recreation",
	// 		"sub_category_options": [
	// 		  "Music School",
	// 		  "Dance & Music",
	// 		  "Event Management",
	// 		  "Theatre",
	// 		  "Clubs",
	// 		  "Cinemas"
	// 		]
	// 	  }
	// 	]
	//   },
	//   {
	// 	"name": "Manufacturing & Production",
	// 	"sub_categories": [
	// 	  {
	// 		"name": "Industrial Manufacturing",
	// 		"sub_category_options": [
	// 		  "Steel Products",
	// 		  "Aluminium Fabrication",
	// 		  "Industrial Goods & Services",
	// 		  "Automatic Lathe Company",
	// 		  "Ammunition",
	// 		  "Explosives & Fireworks",
	// 		  "Machine Tools"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Consumer Goods Manufacturing",
	// 		"sub_category_options": [
	// 		  "Bakery Products",
	// 		  "Food & Beverage Products",
	// 		  "Dairy Products",
	// 		  "Home Appliances",
	// 		  "Handicrafts",
	// 		  "Textile Manufacturing",
	// 		  "Carpets & Curtains"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Building & Construction Materials",
	// 		"sub_category_options": [
	// 		  "Cement & Concrete Products",
	// 		  "Paint & Hardware",
	// 		  "Flooring Materials",
	// 		  "Roofing Sheets & Shingles",
	// 		  "Aluminium Products",
	// 		  "Steel Fabrication",
	// 		  "Wood & Wood Products"
	// 		]
	// 	  }
	// 	]
	//   },



	//   {
	// 	"name": "Education & Training",
	// 	"sub_categories": [
	// 	  {
	// 		"name": "Formal Education",
	// 		"sub_category_options": [
	// 		  "Schools",
	// 		  "Colleges",
	// 		  "Universities",
	// 		  "Technical Institutes"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Training & Skill Development",
	// 		"sub_category_options": [
	// 		  "Vocational Training Centers",
	// 		  "Corporate Training",
	// 		  "Coaching & Tutoring",
	// 		  "IT & Computer Training",
	// 		  "Language Training",
	// 		  "Music & Arts Education"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Other Educational Services",
	// 		"sub_category_options": [
	// 		  "Entrance Coaching Centers",
	// 		  "Online Education Platforms"
	// 		]
	// 	  }
	// 	]
	//   },
	//   {
	// 	"name": "Hospitality & Food Services",
	// 	"sub_categories": [
	// 	  {
	// 		"name": "Restaurants & Cafes",
	// 		"sub_category_options": [
	// 		  "Cafes",
	// 		  "Restaurants",
	// 		  "Fast Food",
	// 		  "Juice Bars"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Lodging & Accommodation",
	// 		"sub_category_options": [
	// 		  "Hotels",
	// 		  "Hostels",
	// 		  "Bed & Breakfast",
	// 		  "Resorts"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Catering & Event Services",
	// 		"sub_category_options": [
	// 		  "Catering Services",
	// 		  "Event Planning",
	// 		  "Wedding Arrangements",
	// 		  "Party Supplies"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Specialty Food Services",
	// 		"sub_category_options": [
	// 		  "Organic Products",
	// 		  "Health Food",
	// 		  "Local & Traditional Foods",
	// 		  "Bakeries & Confectioneries",
	// 		  "Supermarkets & Groceries"
	// 		]
	// 	  }
	// 	]
	//   },
	//   {
	// 	"name": "Agriculture & Farming",
	// 	"sub_categories": [
	// 	  {
	// 		"name": "Farms & Agricultural Services",
	// 		"sub_category_options": [
	// 		  "Agriculture",
	// 		  "Farming",
	// 		  "Organic Farming",
	// 		  "Dairy Farming",
	// 		  "Fishery",
	// 		  "Bee Farm"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Agricultural Products",
	// 		"sub_category_options": [
	// 		  "Fertilizers & Pesticides",
	// 		  "Seeds & Saplings",
	// 		  "Farm Machinery & Equipment"
	// 		]
	// 	  }
	// 	]
	//   },



	//   {
	// 	"name": "Health & Wellness",
	// 	"sub_categories": [
	// 	  {
	// 		"name": "Healthcare Providers",
	// 		"sub_category_options": [
	// 		  "Hospitals & Clinics",
	// 		  "Dental & Eye Care",
	// 		  "Laboratories",
	// 		  "Diagnostic Centers"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Wellness & Fitness",
	// 		"sub_category_options": [
	// 		  "Gyms",
	// 		  "Fitness Centers",
	// 		  "Yoga & Meditation",
	// 		  "Spas & Wellness Centers",
	// 		  "Acupressure & Alternative Medicine"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Medical Supply",
	// 		"sub_category_options": ["Pharmacies & Medical Supplies"]
	// 	  }
	// 	]
	//   },
	//   {
	// 	"name": "Automotive",
	// 	"sub_categories": [
	// 	  {
	// 		"name": "Vehicle Sales & Service",
	// 		"sub_category_options": [
	// 		  "Car Dealerships",
	// 		  "Motorcycle Dealerships",
	// 		  "Auto Repair Shops",
	// 		  "Auto Parts & Accessories",
	// 		  "Tires & Batteries"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Specialty Automotive Services",
	// 		"sub_category_options": [
	// 		  "Towing & Recovery",
	// 		  "Vehicle Cleaning Services",
	// 		  "Auto Detailing",
	// 		  "Vehicle Customization"
	// 		]
	// 	  }
	// 	]
	//   },
	//   {
	// 	"name": "Real Estate & Property",
	// 	"sub_categories": [
	// 	  {
	// 		"name": "Real Estate Services",
	// 		"sub_category_options": [
	// 		  "Real Estate Agencies",
	// 		  "Property Management",
	// 		  "Residential & Commercial Properties",
	// 		  "Property Rentals"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Construction & Development",
	// 		"sub_category_options": [
	// 		  "Builders & Developers",
	// 		  "Interior Design",
	// 		  "Civil Contractors",
	// 		  "Roofing Solutions"
	// 		]
	// 	  }
	// 	]
	//   },



	//   {
	// 	"name": "Media & Entertainment",
	// 	"sub_categories": [
	// 	  {
	// 		"name": "Media & Broadcasting",
	// 		"sub_category_options": [
	// 		  "TV Channels",
	// 		  "Radio Stations",
	// 		  "Online Streaming Services"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Content Creation & Production",
	// 		"sub_category_options": [
	// 		  "Film & Video Production",
	// 		  "Photography Studios",
	// 		  "Animation & Graphics",
	// 		  "Audio Production",
	// 		  "Advertising Agencies",
	// 		  "Publishing & Printing"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Arts & Culture",
	// 		"sub_category_options": [
	// 		  "Art Galleries",
	// 		  "Museums",
	// 		  "Cultural Centers",
	// 		  "Performances & Shows"
	// 		]
	// 	  }
	// 	]
	//   },
  
	//   {
	// 	"name": "Technology & Innovation",
	// 	"sub_categories": [
	// 	  {
	// 		"name": "Software & IT Services",
	// 		"sub_category_options": [
	// 		  "Software Development",
	// 		  "Web Development",
	// 		  "IT Support & Services",
	// 		  "Cybersecurity"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Electronics & Gadgets",
	// 		"sub_category_options": [
	// 		  "Electronics Manufacturing",
	// 		  "Gadget Repairs",
	// 		  "Mobile Phones & Accessories"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Innovation & Startups",
	// 		"sub_category_options": [
	// 		  "Tech Startups",
	// 		  "Incubators & Accelerators",
	// 		  "Research & Development"
	// 		]
	// 	  }
	// 	]
	//   },



	//   {
	// 	"name": "Financial & Legal",
	// 	"sub_categories": [
	// 	  {
	// 		"name": "Banking & Finance",
	// 		"sub_category_options": [
	// 		  "Banks",
	// 		  "Financial Consulting",
	// 		  "Investment Services",
	// 		  "Insurance Agencies",
	// 		  "Loan Providers"
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Legal Services",
	// 		"sub_category_options": [
	// 		  "Law Firms",
	// 		  "Legal Consultancy",
	// 		  "Notary Services",
	// 		  "Accreditation & Certification"
	// 		]
	// 	  }
	// 	]
	//   },
	//   {
	// 	"name": "Non-Profit & NGOs",
	// 	"sub_categories": [
	// 	  {
	// 		"name": "NGO Types",
	// 		"sub_category_options": [
	// 		  "Charitable Organizations",
	// 		  "Community Services",
	// 		  "Environmental NGOs",
	// 		  "Educational NGOs",
	// 		  "Health NGOs"
	// 		]
	// 	  }
	// 	]
	//   },
	//   {
	// 	"name": "Miscellaneous",
	// 	"sub_categories": [
	// 	  {
	// 		"name": "Other Services",
	// 		"sub_category_options": [
	// 		  "Government Offices",
	// 		  "Associations & Societies",
	// 		  "Public Utilities",
	// 		  "Emergency Services",
	// 		  "Religious Services",
	// 		  "Miscellaneous Services",
	// 		  "Individual Workers"
	// 		]
	// 	  }
	// 	]
	//   }



	]
};   


// Seed category, sub-category and sub-category options
export const seedCategory = async () => {
    for (const category of data.categories) {
        const categoryResult = await createCategory(category.name);

        for (const subCategory of category.sub_categories) {
            const subCategoryResult = await createSubCategory(subCategory.name, categoryResult.id);

            for (const subCategoryOption of subCategory.sub_category_options) {
                await createSubCategoryOption(subCategoryOption, subCategoryResult.id);
            }

        }

    }
}
