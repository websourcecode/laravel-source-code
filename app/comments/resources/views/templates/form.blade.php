<form v-show="show && config.authorized" v-on="submit: onSubmit">
    <div v-if="focus">
        <template v-if="!config.user">
            <div class="form-group">
                <input type="text" required v-model="authorName" v-disable="loading" class="form-control" placeholder="@lang('comments::all.name')">
            </div>
            <div class="form-group">
                <input type="email" required v-model="authorEmail" v-disable="loading" class="form-control" placeholder="@lang('comments::all.email')">
            </div>
            <div class="form-group">
                <input type="text" v-model="authorUrl" v-disable="loading" class="form-control" placeholder="@lang('comments::all.url')">
            </div>
        </template>

        <div v-if="config.captchaRequired" class="form-group" id="recaptcha"></div>
    </div>

    <div class="form-group postbox">
        <textarea v-model="content" v-on="click: focus = true" v-disable="loading" class="form-control" wrap="hard"
                maxlength="@{{ config.maxLength }}" placeholder="@{{ parent ? '@lang('comments::all.writer')' : '@lang('comments::all.writec')' }}"
        ></textarea>
    </div>

    <div class="pull-left" v-if="focus">
        <button type="submit" class="btn btn-success btn-sm" v-loading="{state: loading, text: '@lang('comments::all.posting')'}">
            @lang('comments::all.post')
        </button>

        <button type="button" class="btn btn-default btn-sm cancel" v-on="click: cancel">
            @lang('comments::all.cancel')
        </button>
    </div>

    <div class="pull-right" v-if="focus && config.maxLength">
        <span class="char-count">@{{ config.maxLength - content.length }}</span>
    </div>

    <alert errors="@{{ errors }}"></alert>
</form>
