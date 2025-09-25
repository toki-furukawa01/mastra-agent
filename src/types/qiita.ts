/**
 * Qiitaのタグ情報を表すインターフェース
 */
export interface QiitaTag {
    /** タグの名前 */
    name: string;
    /** タグのバージョン情報 */
    versions: string[];
}

/**
 * Qiitaのユーザー情報を表すインターフェース
 */
export interface QiitaUser {
    /** 自己紹介文 */
    description: string | null;
    /** Facebook ID */
    facebook_id: string | null;
    /** このユーザーがフォローしているユーザーの数 */
    followees_count: number;
    /** このユーザーをフォローしているユーザーの数 */
    followers_count: number;
    /** GitHub ID */
    github_login_name: string | null;
    /** ユーザーID */
    id: string;
    /** このユーザーが qiita.com 上で公開している記事の数 (Qiita Teamでの記事数は含まれません) */
    items_count: number;
    /** LinkedIn ID */
    linkedin_id: string | null;
    /** 居住地 */
    location: string | null;
    /** 設定している名前 */
    name: string | null;
    /** 所属している組織 */
    organization: string | null;
    /** ユーザーごとに割り当てられる整数のID */
    permanent_id: number;
    /** 設定しているプロフィール画像のURL */
    profile_image_url: string;
    /** Qiita Team専用モードに設定されているかどうか */
    team_only: boolean;
    /** Twitterのスクリーンネーム */
    twitter_screen_name: string | null;
    /** 設定しているWebサイトのURL */
    website_url: string | null;
}

/**
 * Qiitaの記事情報を表すインターフェース
 */
export interface QiitaPostResponse {
    /** HTML形式の本文 */
    rendered_body: string;
    /** Markdown形式の本文 */
    body: string;
    /** この記事が共同更新状態かどうか (Qiita Teamでのみ有効) */
    coediting: boolean;
    /** この記事へのコメントの数 */
    comments_count: number;
    /** データが作成された日時 */
    created_at: string;
    /** Qiita Teamのグループ情報 */
    group: any | null;
    /** 記事の一意なID */
    id: string;
    /** この記事への「いいね」の数（Qiitaでのみ有効） */
    likes_count: number;
    /** 限定共有状態かどうかを表すフラグ (Qiita Teamでは無効) */
    private: boolean;
    /** 絵文字リアクションの数（Qiita Teamでのみ有効） */
    reactions_count: number;
    /** この記事がストックされた数 */
    stocks_count: number;
    /** 記事に付いたタグ一覧 */
    tags: QiitaTag[];
    /** 記事のタイトル */
    title: string;
    /** データが最後に更新された日時 */
    updated_at: string;
    /** 記事のURL */
    url: string;
    /** Qiita上のユーザー情報 */
    user: QiitaUser;
    /** 閲覧数 */
    page_views_count: number | null;
    /** Qiita Team のチームメンバー情報 */
    team_membership: any | null;
    /** 記事のOrganization の url_name */
    organization_url_name: string | null;
    /** スライドモードが有効かどうかを表すフラグ */
    slide: boolean;
}