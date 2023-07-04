import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

import {UpdateProfile, PendingPerson} from '../@types/Types';

interface MinonState {
	minon: number;
	increase: (by: number) => void;
	decrease: (by: number) => void;
}

export const MinonStore = create<MinonState>()((set) => ({
	minon: 0,
	increase: (by) => set((state) => ({minon: state.minon + by})),
	decrease: (by) => set((state) => ({minon: state.minon === 0 ? (state.minon = 0) : state.minon - by})),
}));

interface NavbarStates {
	collapsed: boolean;
	toggled: boolean;
	breakpoint: boolean;
	isCollapsed: (bool: boolean) => void;
	isToggled: (bool: boolean) => void;
	reachedBreakpoint: (bool: boolean) => void;
}

export const NavbarStore = create<NavbarStates>()((set) => ({
	collapsed: false,
	toggled: false,
	breakpoint: false,
	isCollapsed: (bool) => set(() => ({collapsed: bool})),
	isToggled: (bool) => set(() => ({toggled: bool})),
	reachedBreakpoint: (bool) => set(() => ({breakpoint: bool})),
}));

interface LoginAndOut {
	logedIn: boolean;
	MinonLogin: () => void;
	MinonLogout: () => void;
}

export const LoginAndOut = create<LoginAndOut>()(
	persist(
		// @ts-ignore
		(set, get) => ({
			logedIn: false,
			MinonLogin: () => set({logedIn: true}),
			MinonLogout: () => set(() => ({logedIn: false})),
		}),
		{
			name: 'minon-logged-in', // unique storage name
			storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
		}
	)
);

// USER PROFILE STORE
interface ProfileInfo {
	avatar_url_path: string;
	localProfileInfo: UpdateProfile;
	UpdateProfileInfo: (profileData: Partial<UpdateProfile>) => void;
	getUserRole: () => string | undefined;
}

export const userProfileStore = create<ProfileInfo>()((set, get) => ({
	avatar_url_path: `http://localhost:3001/images/profile_pictures/`,
	localProfileInfo: {
		role: '',
		first_name: '',
		last_name: '',
		email: '',
		personal_email: '',
		phone: '',
		department: '',
		profile_picture: '',
		user_id: '',
		tags: [],
	},

	UpdateProfileInfo: (profileData) =>
		set((state) => ({
			localProfileInfo: {...state.localProfileInfo, ...profileData},
		})),
	getUserRole: () => {
		return get().localProfileInfo.role;
	},
}));

// PENDING USER STORE
interface PendingUser {
	pendingPerson: PendingPerson[];
	storePendingPeople: (personArr: PendingPerson[]) => void;
	filterPendingPeople: (callback: (currData: PendingPerson[]) => PendingPerson[]) => void;
}
export const PendingUserStore = create<PendingUser>((set) => ({
	pendingPerson: [],
	storePendingPeople: (personArr) => set(() => ({pendingPerson: personArr})),
	filterPendingPeople: (callback) => set((state) => ({pendingPerson: callback(state.pendingPerson)})),
}));

// TUTORIAL TAG STORE
interface TagsList {
	defaultTags: string[];
	selctedTags: string[];
	storeSelectedTags: (tagsArr: string[]) => void;
}
export const TutorialTagStore = create<TagsList>((set) => ({
	defaultTags: [
		'FIRE',
		'EMERGENCY',
		'QUALITY',
		'HR',
		'ADMIN',
		'ONBOARDING',
		'FINANCE',
		'JANITOR',
		'PROCUREMENT',
		'WAREHOUSE',
	],
	selctedTags: [],
	storeSelectedTags: (tagsArr) => set(() => ({selctedTags: tagsArr})),
}));

// TUTORIAL STORE
interface TutorialStore {
	userTutorials: string[];
	allTutorials: string[];
	storeUserTutorials: (tutorialsArr: string[]) => void;
	storeAllTutorials: (tutorialsArr: string[]) => void;
}
export const TutorialStore = create<TutorialStore>((set) => ({
	userTutorials: [],
	allTutorials: [],
	storeUserTutorials: (tutorialsArr) => set(() => ({userTutorials: tutorialsArr})),
	storeAllTutorials: (tutorialsArr) => set(() => ({allTutorials: tutorialsArr})),
}));
