import { Article, ArticleStatus } from "@/utils/types/Article";
import { User } from "@/utils/types/User";
import { useHttpClient } from "@/utils/useHttpClient";
import { BASE_URL } from "astro:env/client";
import { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import { getCookie } from "@/utils/CookieStore";

export default function SaveForm({token, articleId}: {token: string, articleId?: string | number}) {
    const {post, put, get} = useHttpClient(token);
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [form, setForm] = useState<Article>({
        title: '',
        slug: '',
        content: '',
        userId: 1,
        status: 'draft',
        type: 'post',
        isPublished: false,
        isArchived: false,
        isDeleted: false,
        summary: '',
        tags: [],
        image: '',
    });

    useEffect(() => {
        onInit();
    }, [articleId]);

    const onInit = () => {
        if (articleId) {
            get(BASE_URL + '/articles/' + articleId)
            .then((data: Response) => {
                return data.json();
            })
            .then((data: Article) => {
                setForm(data);
            }).catch((err: Error) => {
                console.log(err);
            });
        }
        get(`${BASE_URL}/users`)
        .then((res: Response) => {
            if (res.ok === false) {
                console.log(res.text());
                return;
            }
            return res.json()
            .then((data: User[]) => {
                setUsers(data);
            });
        })
        .catch((err) => {
            console.log(err);
        });
        getCookie('user').then((data) => {
            if (data) {
                setCurrentUser(JSON.parse(data as string) as User);
            }
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (articleId) {
            return put(`${BASE_URL}/articles/${articleId}`, form)
            .then((res: Response) => {
                if (res.ok === false) {
                    console.log(res.text());
                    return;
                }
                return res.json()
                .then((data: Article) => {
                    console.log(data);
                    window.location.replace('/admin/articles');
                });
            })
            .catch((err) => {
                console.log(err);
            });
        }else{
            return post(`${BASE_URL}/articles`, form)
            .then((res: Response) => {
                if (res.ok === false) {
                    console.log(res.text());
                    return;
                }
                return res.json()
                .then((data: Article) => {
                    console.log(data);
                    window.location.replace('/admin/articles');
                });
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <div className="w-full mx-auto mb-[-1.5rem]">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-extrabold text-gray-800">✍️ {articleId ? 'Edit' : 'Create'} New Article</h1>
                <div className="flex items-center gap-2">
                    <a href="/admin/articles" className="bg-gray-200 text-gray-700 px-5 py-4 rounded-xl text-sm font-semibold hover:bg-gray-300 transition duration-200 shadow-md">
                        Back to Articles
                    </a>
                    <button type="button" className="bg-violet-600 text-white px-5 py-4 rounded-xl text-sm font-semibold hover:bg-violet-700 transition duration-200 shadow-lg shadow-violet-500/50">
                    🚀 Publish Article
                    </button>
                </div>
            </div>
            <hr className="mb-2" />
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                    <div className="md:h-[85vh] md:overflow-scroll lg:col-span-3 lg:pr-6 lg:border-r lg:border-gray-600">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">Write An Article</h3>

                            <div className="mb-2">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title <span className="text-red-500">*</span></label>
                                <input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} type="text" id="title" className="input-field" placeholder="A compelling headline htmlFor your article" required />
                            </div>

                            <div className="mb-6 flex items-center gap-3">
                                <label htmlFor="slug" className="w-12 text-sm font-medium text-gray-700 mb-2">Slug <span className="text-red-500">*</span></label>
                                <input value={form.slug || form.title.replace(/\s+/g, '-').toLowerCase()} onChange={(e) => setForm({...form, slug: e.target.value})} type="text" id="slug" className="input-readonly p-2 text-sm" placeholder="my-compelling-headline" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content <span className="text-red-500">*</span></label>
                                <textarea value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} id="content" rows={20} className="input-field resize-y" placeholder="Start writing your article content here..." required></textarea>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-violet-500/50 transition duration-300 ease-in-out transhtmlForm hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-violet-500 focus:ring-opacity-50">
                                    🚀 Save Article
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="md:h-[85vh] md:overflow-scroll lg:col-span-1 space-y-3 lg:pr-2">
                        
                        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">Publish Settings</h3>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between items-center gap-3">
                                    <label htmlFor="status" className="block text-md font-semibold text-gray-700 mb-2">Status</label>
                                    <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})} id="status" className="select-field">
                                        {
                                            Object.values(ArticleStatus).map((status, index) => (
                                                <option key={index} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="flex justify-between items-center gap-3">
                                    <label htmlFor="author" className="block text-md font-semibold text-gray-700 mb-2">Author</label>
                                    <select value={form.userId || currentUser?.id} onChange={(e) => setForm({...form, userId: Number(e.target.value)})} id="author" className="select-field">
                                        {
                                            users.map((user, index) => (
                                                <option key={index} value={user.id}>{user.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">Featured Image</h3>

                            <ImageUpload token={token} fileName={form.image} onSubmitSuccess={(data) => setForm({...form, image: data.filename})} />
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">Tags</h3>
                            <label htmlFor="tags" className="sr-only">Tags</label>
                            <input value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value.includes(',') ? e.target.value.split(',') : [e.target.value]})} type="text" id="tags" className="input-field" placeholder="e.g., programming, css, tutorial" />
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">Summary</h3>
                            <p className="text-gray-500 text-sm leading-6">
                                <textarea value={form.summary || form.content.slice(0, 200)} onChange={(e) => setForm({...form, summary: e.target.value})} className="input-field" placeholder="Start writing your article summery here..."></textarea>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}