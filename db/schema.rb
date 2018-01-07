# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180107102926) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.bigint "card_id"
    t.integer "amount", default: 0
    t.integer "transaction_ids"
    t.index ["card_id"], name: "index_accounts_on_card_id"
  end

  create_table "blacklists", force: :cascade do |t|
    t.bigint "claims_id"
    t.bigint "user_id"
    t.index ["claims_id"], name: "index_blacklists_on_claims_id"
    t.index ["user_id"], name: "index_blacklists_on_user_id"
  end

  create_table "cards", force: :cascade do |t|
    t.string "number"
    t.integer "cvv2"
    t.date "expiry_date"
    t.bigint "user_id"
    t.index ["user_id"], name: "index_cards_on_user_id"
  end

  create_table "claims", force: :cascade do |t|
    t.bigint "user_id"
    t.text "description"
    t.index ["user_id"], name: "index_claims_on_user_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.integer "account_from_id"
    t.integer "account_to_id"
    t.integer "amount", default: 0
    t.integer "result", default: 0
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "first_name"
    t.string "last_name"
    t.date "birth_date"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

end
