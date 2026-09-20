import { createClient} from "@supabase/supabase-js";

export const supabase = createClient(
    "https://tmjwybngraibbzndkzqs.supabase.co/rest/v1/",
    "sb_publishable_Q0uGzYR6AUD9fkgPb9LWOg_LhqXbvjz"
);