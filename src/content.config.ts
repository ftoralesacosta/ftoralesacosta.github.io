import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

export const collections = {
	blog: defineCollection({
		// Load Markdown files in the src/content/work directory.
		loader: glob({ base: './src/content/blog', pattern: '**/*.md', }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			img: z.string(),
			img_alt: z.string().optional(),
            img_caption: z.string().optional(), // The caption for the main image
            img_credit: z.string().optional(), // The credit for the main image
		}),
	}),
	work: defineCollection({
		// Load Markdown files in the src/content/work directory.
		loader: glob({ base: './src/content/work', pattern: '**/*.md', }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			img: z.string(),
			img_alt: z.string().optional(),
            img_caption: z.string().optional(), // The caption for the main image
            img_credit: z.string().optional(), // The credit for the main image
		}),
	}),
};
