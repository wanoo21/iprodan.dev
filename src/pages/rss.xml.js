import rss from '@astrojs/rss';
import {getCollection} from 'astro:content';
import { useTranslations } from '@/i18n';

const t = useTranslations();

export async function GET(context) {
    const [posts, labs] = await Promise.all([
        getCollection('blog', ({ data }) => !data.draft),
        getCollection('labs', ({ data }) => !data.draft),
    ]);

    const blogItems = posts.map(({ id, data: { title, summary, tags, date } }) => ({
        title,
        categories: tags.map((ref) => ref.id), // TODO: add tags name in the future
        pubDate: date,
        description: summary,
        link: `/blog/${id}/`,
    }));

    const labItems = labs.map(({ id, data: { title, description, published_date, badge } }) => ({
        title,
        categories: badge ? [badge] : [],
        pubDate: published_date,
        description,
        link: `/l/${id}`,
    }));

    const items = [...blogItems, ...labItems].sort(
        (a, b) => b.pubDate.getTime() - a.pubDate.getTime(),
    );

    return rss({
        title: t('siteMetadata.title'),
        description: t('siteMetadata.description'),
        site: context.site,
        items,
    });
}
