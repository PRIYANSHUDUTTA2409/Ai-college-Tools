import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogsDirectory = path.join(process.cwd(), 'content/blogs');

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    content: string;
    readingTime?: string;
    [key: string]: any;
}

export function getBlogPosts(): BlogPost[] {
    // Ensure directory exists
    if (!fs.existsSync(blogsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(blogsDirectory);
    const allBlogsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(blogsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        return {
            slug,
            ...(matterResult.data as { title: string; description: string; date: string }),
            content: matterResult.content,
        };
    });

    // Sort posts by date
    return allBlogsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getBlogPost(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(blogsDirectory, `${slug}.md`);
        if (!fs.existsSync(fullPath)) {
            return null;
        }
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            slug,
            ...(matterResult.data as { title: string; description: string; date: string }),
            content: matterResult.content,
        };
    } catch (error) {
        return null;
    }
}
