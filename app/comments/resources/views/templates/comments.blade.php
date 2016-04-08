<div v-if="initialized" v-transition="expand">
    <div class="comment-sort pull-right dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            @{{ sortText }} <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
            <li v-repeat="sortOptions" v-class="active: sort == $key">
                <a href="#" v-on="click: sortBy($key, $event)">@{{ sortOptions[$key] }}</a>
            </li>
        </ul>
    </div>

    <h3 class="total">
        @{{ total }} @{{ total > 1 ? 'comments' : (total === 1 ? 'comment' : 'no comments') }}
    </h3>
</div>

<div v-if="!initialized" class="spinner">
    @lang('comments::all.loading')
</div>

<div v-if="initialized">
    <div class="alert alert-warning" v-if="!config.authorized">@lang('comments::all.auth')</div>

    <post config="@{{ config }}" comment-list="@{{@ commentList }}" total="@{{@ total }}"></post>

    <div class="clearfix"></div>
    <div v-show="loading" class="spinner">@lang('comments::all.loading')</div>

    <ul class="comment-list" v-if="!loading" v-transition="fade">
        <comment v-repeat="comment: commentList" total="@{{@ total }}" config="@{{ config }}" target="@{{@ target }}"></comment>
    </ul>

    <div class="text-center" v-if="!loading && pagination.total > pagination.per_page">
        <ul class="pagination pagination-sm">
            <li v-class="disabled: pagination.current_page == 1">
                <a href="#!page=@{{ pagination.prev_page }}" v-on="click: changePage(pagination.prev_page, $event)">&laquo;</a>
            </li>
            <li v-if="pagination.first_adjacent_page > 1">
                <a href="#!page=1" v-on="click: changePage(1, $event)">1</a>
            </li>
            <li v-if="pagination.first_adjacent_page > 2" class="disabled"><a>...</a></li>
            <template v-repeat="pagination.last_adjacent_page">
                <li v-if="$index + 1 >= pagination.first_adjacent_page" v-class="active: pagination.current_page == $index + 1">
                    <a href="#!page=@{{ $index + 1 }}" v-on="click: changePage($index + 1, $event)">@{{ $index + 1 }}</a>
                </li>
            </template>
            <li v-if="pagination.last_adjacent_page < pagination.last_page - 1" class="disabled"><a>...</a></li>
            <li v-if="pagination.last_adjacent_page < pagination.last_page">
                <a href="#!page=@{{ pagination.last_page }}" v-on="click: changePage(pagination.last_page, $event)">@{{ pagination.last_page }}</a>
            </li>
            <li v-class="disabled: pagination.current_page === pagination.last_page">
                <a href="#!page=@{{ pagination.next_page }}" v-on="click: changePage(pagination.next_page, $event)">&raquo;</a>
            </li>
        </ul>
    </div>
</div>
