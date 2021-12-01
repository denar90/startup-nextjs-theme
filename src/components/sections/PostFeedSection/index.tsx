import * as React from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { getComponent } from '../../components-registry';
import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import { Link, Action } from '../../atoms';
import getPageUrlPath from '../../../utils/get-page-url-path';

export default function PostFeedSection(props) {
    const cssId = props.elementId || null;
    const colors = props.colors || 'colors-a';
    const sectionStyles = props.styles?.self || {};
    const sectionBorderWidth = sectionStyles.borderWidth ? sectionStyles.borderWidth : 0;
    const justifyContent = mapStyles({ justifyContent: sectionStyles.justifyContent || 'center' });
    const width = mapMaxWidthStyles(sectionStyles.width || 'wide');

    return (
        <div
            id={cssId}
            {...getDataAttrs(props)}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-component-post-feed-section',
                colors,
                'flex',
                'flex-col',
                'justify-center',
                'relative',
                mapMinHeightStyles(sectionStyles.height || 'auto'),
                sectionStyles.margin,
                sectionStyles.padding || 'py-12 px-4',
                sectionStyles.borderColor,
                sectionStyles.borderRadius ? mapStyles({ borderRadius: sectionStyles.borderRadius }) : null,
                sectionStyles.borderStyle ? mapStyles({ borderStyle: sectionStyles.borderStyle }) : null
            )}
            style={{
                borderWidth: `${sectionBorderWidth}px`
            }}
        >
            <div className={classNames('flex', 'w-full', justifyContent)}>
                <div className={classNames('w-full', width)}>
                    {postFeedHeader(props)}
                    {postFeedVariants(props)}
                    {postFeedActions(props)}
                    {props.pageLinks}
                </div>
            </div>
        </div>
    );
}

function postFeedHeader(props) {
    if (!props.title && !props.subtitle) {
        return null;
    }
    const styles = props.styles || {};
    return (
        <div>
            {props.title && (
                <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} data-sb-field-path=".title">
                    {props.title}
                </h2>
            )}
            {props.subtitle && (
                <p
                    className={classNames('text-lg', 'sm:text-xl', styles.subtitle ? mapStyles(styles.subtitle) : null, { 'mt-2': props.title })}
                    data-sb-field-path=".subtitle"
                >
                    {props.subtitle}
                </p>
            )}
        </div>
    );
}

function postFeedActions(props) {
    const actions = props.actions || [];
    if (actions.length === 0) {
        return null;
    }
    const styles = props.styles || {};
    return (
        <div
            className={classNames('flex', 'flex-wrap', 'items-center', 'mt-12', '-mx-2', styles.actions ? mapStyles(styles.actions) : null)}
            data-sb-field-path=".actions"
        >
            {props.actions.map((action, index) => (
                <Action key={index} {...action} className="mb-3 mx-2 lg:whitespace-nowrap" data-sb-field-path={`.${index}`} />
            ))}
        </div>
    );
}

function postFeedVariants(props) {
    const variant = props.variant || 'variant-a';
    switch (variant) {
        case 'variant-a':
            return postsVariantA(props);
        case 'variant-b':
            return postsVariantB(props);
        case 'variant-c':
            return postsVariantC(props);
        case 'variant-d':
            return postsVariantD(props);
    }
    return null;
}

function postsVariantA(props) {
    const posts = props.posts || [];
    if (posts.length === 0) {
        return null;
    }
    const ImageBlock = getComponent('ImageBlock');
    return (
        <div className={classNames('grid', 'gap-6', 'md:grid-cols-3', 'lg:gap-8', { 'mt-12': props.title || props.subtitle })} data-sb-field-path=".posts">
            {posts.map((post, index) => (
                <article key={index} className="sb-card" data-sb-object-id={post.__metadata?.id}>
                    {post.featuredImage && (
                        <Link href={getPageUrlPath(post)} className="block h-0 w-full pt-9/16 relative" data-sb-field-path="featuredImage">
                            <ImageBlock {...post.featuredImage} className="absolute left-0 top-0 h-full w-full object-cover" />
                        </Link>
                    )}
                    <div className="px-4 py-6 sm:px-6 sm:pb-10">
                        {props.showDate && <PostDate post={post} />}
                        <h3>
                            <Link href={getPageUrlPath(post)} data-sb-field-path="title">
                                {post.title}
                            </Link>
                        </h3>
                        <PostAttribution showAuthor={props.showAuthor} post={post} />
                        {post.excerpt && (
                            <p className="mt-3" data-sb-field-path="excerpt">
                                {post.excerpt}
                            </p>
                        )}
                    </div>
                </article>
            ))}
        </div>
    );
}

function postsVariantB(props) {
    const posts = props.posts || [];
    if (posts.length === 0) {
        return null;
    }
    const ImageBlock = getComponent('ImageBlock');
    return (
        <div className={classNames('grid', 'gap-6', 'md:grid-cols-3', 'lg:gap-8', { 'mt-12': props.title || props.subtitle })} data-sb-field-path=".posts">
            {posts.map((post, index) => (
                <article
                    key={index}
                    className={classNames('sb-card', {
                        'md:col-span-2': index % 4 === 0 || (index + 1) % 4 === 0
                    })}
                    data-sb-object-id={post.__metadata?.id}
                >
                    {post.featuredImage && (
                        <Link
                            href={getPageUrlPath(post)}
                            className="block h-0 w-full pt-9/16 relative md:pt-0 md:h-60 lg:h-72"
                            data-sb-field-path="featuredImage"
                        >
                            <ImageBlock {...post.featuredImage} className="absolute left-0 top-0 h-full w-full object-cover" />
                        </Link>
                    )}
                    <div className="px-4 py-6 sm:px-6 sm:pb-10">
                        {props.showDate && <PostDate post={post} />}
                        <h3>
                            <Link href={getPageUrlPath(post)} data-sb-field-path="title">
                                {post.title}
                            </Link>
                        </h3>
                        <PostAttribution showAuthor={props.showAuthor} post={post} />
                        {post.excerpt && (
                            <p className="mt-3" data-sb-field-path="excerpt">
                                {post.excerpt}
                            </p>
                        )}
                    </div>
                </article>
            ))}
        </div>
    );
}

function postsVariantC(props) {
    const posts = props.posts || [];
    if (posts.length === 0) {
        return null;
    }
    const ImageBlock = getComponent('ImageBlock');
    return (
        <div className={classNames('grid', 'gap-6', 'md:grid-cols-3', 'lg:gap-8', { 'mt-12': props.title || props.subtitle })} data-sb-field-path=".posts">
            {posts.map((post, index) => {
                const isFullWidth = index % 4 === 0;
                return (
                    <article
                        key={index}
                        className={classNames('sb-card', {
                            'md:col-span-3 md:flex': isFullWidth
                        })}
                        data-sb-object-id={post.__metadata.id}
                    >
                        {post.featuredImage && (
                            <div
                                className={classNames({
                                    'md:w-2/5': isFullWidth
                                })}
                            >
                                <Link
                                    href={getPageUrlPath(post)}
                                    className={classNames('block', 'h-0', 'w-full', 'pt-9/16', 'relative', {
                                        'md:h-60 md:min-h-full md:pt-0 lg:h-72': isFullWidth
                                    })}
                                    data-sb-field-path="featuredImage"
                                >
                                    <ImageBlock {...post.featuredImage} className="absolute left-0 top-0 h-full w-full object-cover" />
                                </Link>
                            </div>
                        )}
                        <div
                            className={classNames('px-4 pt-6 pb-8 sm:px-6', {
                                'md:w-3/5 md:pt-8 md:pb-10': isFullWidth
                            })}
                        >
                            {props.showDate && <PostDate post={post} />}
                            <h3>
                                <Link href={getPageUrlPath(post)} data-sb-field-path="title">
                                    {post.title}
                                </Link>
                            </h3>
                            <PostAttribution showAuthor={props.showAuthor} post={post} />
                            {post.excerpt && (
                                <p className="mt-3" data-sb-field-path="excerpt">
                                    {post.excerpt}
                                </p>
                            )}
                        </div>
                    </article>
                );
            })}
        </div>
    );
}

function postsVariantD(props) {
    const posts = props.posts || [];
    if (posts.length === 0) {
        return null;
    }
    const ImageBlock = getComponent('ImageBlock');
    return (
        <div className={classNames({ 'mt-12': props.title || props.subtitle })} data-sb-field-path=".posts">
            {posts.map((post, index) => (
                <article key={index} className="sb-card mb-8 md:flex" data-sb-object-id={post.__metadata.id}>
                    {post.featuredImage && (
                        <div className="md:w-2/5">
                            <Link
                                href={getPageUrlPath(post)}
                                className="block h-0 w-full pt-9/16 relative md:h-60 md:min-h-full md:pt-0 lg:h-72"
                                data-sb-field-path="featuredImage"
                            >
                                <ImageBlock {...post.featuredImage} className="absolute left-0 top-0 h-full w-full object-cover" />
                            </Link>
                        </div>
                    )}
                    <div className="px-4 pt-6 pb-8 sm:px-6 md:w-3/5 md:pt-8 md:pb-10">
                        {props.showDate && <PostDate post={post} />}
                        <h3>
                            <Link href={getPageUrlPath(post)} data-sb-field-path="title">
                                {post.title}
                            </Link>
                        </h3>
                        <PostAttribution showAuthor={props.showAuthor} post={post} />
                        {post.excerpt && (
                            <p className="mt-3" data-sb-field-path="excerpt">
                                {post.excerpt}
                            </p>
                        )}
                    </div>
                </article>
            ))}
        </div>
    );
}

function PostDate({ post }) {
    if (!post.date) {
        return null;
    }
    const date = post.date;
    const dateTimeAttr = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    const formattedDate = dayjs(date).format('MMMM D, YYYY');
    return (
        <div className="text-sm mb-1">
            <time dateTime={dateTimeAttr} data-sb-field-path="date">
                {formattedDate}
            </time>
        </div>
    );
}

function PostAttribution({ showAuthor, post }) {
    const author = showAuthor ? postAuthor(post) : null;
    const category = postCategory(post);
    if (!author && !category) {
        return null;
    }
    return (
        <div className="text-sm mt-1">
            {author && (
                <>
                    {'By '}
                    {author}
                </>
            )}
            {category && (
                <>
                    {author ? ' in ' : 'In '}
                    {category}
                </>
            )}
        </div>
    );
}

function postAuthor(post) {
    if (!post.author) {
        return null;
    }
    const author = post.author;
    const children = (
        <>
            {author.firstName && <span data-sb-field-path=".firstName">{author.firstName}</span>}{' '}
            {author.lastName && <span data-sb-field-path=".lastName">{author.lastName}</span>}
        </>
    );
    if (author.slug) {
        return (
            <Link data-sb-field-path="author" href={`/blog/author/${author.slug}`}>
                {children}
            </Link>
        );
    } else {
        return <span data-sb-field-path="author">{children}</span>;
    }
}

function postCategory(post) {
    if (!post.category) {
        return null;
    }
    const category = post.category;
    return (
        <Link data-sb-field-path="category" href={getPageUrlPath(category)}>
            {category.title}
        </Link>
    );
}

function mapMinHeightStyles(height) {
    switch (height) {
        case 'auto':
            return 'min-h-0';
        case 'screen':
            return 'min-h-screen';
    }
    return null;
}

function mapMaxWidthStyles(width) {
    switch (width) {
        case 'narrow':
            return 'max-w-screen-md';
        case 'wide':
            return 'max-w-screen-xl';
        case 'full':
            return 'max-w-full';
    }
    return null;
}
