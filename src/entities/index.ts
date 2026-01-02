/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: contactsubmissions
 * Interface for ContactSubmissions
 */
export interface ContactSubmissions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  subject?: string;
  /** @wixFieldType text */
  message?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
  /** @wixFieldType text */
  status?: string;
}


/**
 * Collection ID: projects
 * Interface for Projects
 */
export interface Projects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType image */
  projectImage?: string;
  /** @wixFieldType text */
  methodology?: string;
  /** @wixFieldType text */
  results?: string;
  /** @wixFieldType text */
  technologiesUsed?: string;
  /** @wixFieldType date */
  projectDate?: Date | string;
  /** @wixFieldType url */
  projectUrl?: string;
}
